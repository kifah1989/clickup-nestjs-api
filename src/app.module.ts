import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClickUpModule } from './clickup/clickup.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { GlobalJwtAuthGuard } from './auth/global-jwt-auth.guard';
import { ApiLoggingMiddleware } from './common/middleware/api-logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => ({
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.ms(),
              winston.format.simple(),
            ),
          }),
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json(),
              winston.format.printf((info) => {
                // Redact sensitive information
                const sanitized = { ...info };
                if (
                  sanitized.message &&
                  typeof sanitized.message === 'string'
                ) {
                  sanitized.message = sanitized.message
                    .replace(/pk_[a-zA-Z0-9_]+/g, 'pk_[REDACTED]')
                    .replace(
                      /password["\s]*:["\s]*[^"]+/gi,
                      'password: "[REDACTED]"',
                    );
                }
                return JSON.stringify(sanitized);
              }),
            ),
          }),
          new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json(),
              winston.format.printf((info) => {
                // Redact sensitive information
                const sanitized = { ...info };
                if (
                  sanitized.message &&
                  typeof sanitized.message === 'string'
                ) {
                  sanitized.message = sanitized.message
                    .replace(/pk_[a-zA-Z0-9_]+/g, 'pk_[REDACTED]')
                    .replace(
                      /password["\s]*:["\s]*[^"]+/gi,
                      'password: "[REDACTED]"',
                    );
                }
                return JSON.stringify(sanitized);
              }),
            ),
          }),
        ],
      }),
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          name: 'short',
          ttl: parseInt(config.get('THROTTLE_TTL') || '60000', 10),
          limit: parseInt(config.get('THROTTLE_LIMIT') || '10', 10),
        },
        {
          name: 'medium',
          ttl: 600000, // 10 minutes
          limit: 100,
        },
        {
          name: 'long',
          ttl: 3600000, // 1 hour
          limit: 1000,
        },
      ],
    }),
    HttpModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    ClickUpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: GlobalJwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiLoggingMiddleware).forRoutes('*');
  }
}

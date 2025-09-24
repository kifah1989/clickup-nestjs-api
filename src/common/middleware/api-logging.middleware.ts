import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../../users/users.service';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

@Injectable()
export class ApiLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ApiLoggingMiddleware.name);

  constructor(private usersService: UsersService) {}

  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on('finish', async () => {
      const duration = Date.now() - startTime;
      const { method, originalUrl } = req;
      const { statusCode } = res;

      // Log API usage
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${duration}ms`,
      );

      // Save to database if user is authenticated
      if (req.user && req.user.id) {
        try {
          await this.usersService.logApiUsage(
            req.user.id,
            originalUrl,
            method,
            statusCode,
          );
        } catch (error) {
          this.logger.error('Failed to log API usage', error);
        }
      }
    });

    next();
  }
}
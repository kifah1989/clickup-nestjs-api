import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [ListsController],
  providers: [ListsService],
  exports: [ListsService],
})
export class ListsModule {}
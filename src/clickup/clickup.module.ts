import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { SpacesModule } from './spaces/spaces.module';
import { ListsModule } from './lists/lists.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TasksModule, SpacesModule, ListsModule, UsersModule],
  exports: [TasksModule, SpacesModule, ListsModule, UsersModule],
})
export class ClickUpModule {}

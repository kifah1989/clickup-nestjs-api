import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Observable, catchError } from 'rxjs';
import { TasksService } from './tasks.service';
import { ClickUpTask } from '../common/interfaces/clickup-response.interface';
import { CreateTaskDto, UpdateTaskDto } from '../common/dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles, RolesGuard, UserRole } from '../../auth/roles.guard';

@ApiTags('Tasks')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('list/:listId')
  @ApiOperation({ summary: 'Get tasks from a specific list' })
  @ApiParam({ name: 'listId', description: 'ClickUp List ID' })
  @ApiQuery({ name: 'archived', required: false, type: Boolean })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'order_by', required: false, enum: ['created', 'updated', 'due_date'] })
  @ApiQuery({ name: 'reverse', required: false, type: Boolean })
  @ApiQuery({ name: 'subtasks', required: false, type: Boolean })
  @ApiQuery({ name: 'include_closed', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getTasksByListId(
    @Param('listId') listId: string,
    @Query('archived') archived?: boolean,
    @Query('page') page?: number,
    @Query('order_by') order_by?: 'created' | 'updated' | 'due_date',
    @Query('reverse') reverse?: boolean,
    @Query('subtasks') subtasks?: boolean,
    @Query('include_closed') include_closed?: boolean,
  ): Observable<{ tasks: ClickUpTask[] }> {
    const params = {
      archived,
      page,
      order_by,
      reverse,
      subtasks,
      include_closed,
    };

    return this.tasksService.getTasksByListId(listId, params).pipe(
      catchError((error) => {
        throw new HttpException(
          error.response?.data?.message || 'Failed to fetch tasks',
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  @Get(':taskId')
  @ApiOperation({ summary: 'Get a specific task by ID' })
  @ApiParam({ name: 'taskId', description: 'ClickUp Task ID' })
  @ApiQuery({ name: 'custom_task_ids', required: false, type: Boolean })
  @ApiQuery({ name: 'team_id', required: false, type: String })
  @ApiQuery({ name: 'include_subtasks', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getTaskById(
    @Param('taskId') taskId: string,
    @Query('custom_task_ids') custom_task_ids?: boolean,
    @Query('team_id') team_id?: string,
    @Query('include_subtasks') include_subtasks?: boolean,
  ): Observable<ClickUpTask> {
    const params = {
      custom_task_ids,
      team_id,
      include_subtasks,
    };

    return this.tasksService.getTaskById(taskId, params).pipe(
      catchError((error) => {
        throw new HttpException(
          error.response?.data?.message || 'Failed to fetch task',
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  @Post('list/:listId')
  @ApiOperation({ summary: 'Create a new task in a list' })
  @ApiParam({ name: 'listId', description: 'ClickUp List ID' })
  @ApiQuery({ name: 'custom_task_ids', required: false, type: Boolean })
  @ApiQuery({ name: 'team_id', required: false, type: String })
  @ApiResponse({ status: 503, description: 'Feature currently disabled' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  createTask(
    @Param('listId') listId: string,
    @Body() createTaskDto: CreateTaskDto,
    @Query('custom_task_ids') custom_task_ids?: boolean,
    @Query('team_id') team_id?: string,
  ): { message: string } {
    throw new HttpException(
      'This feature is currently disabled',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  @Put(':taskId')
  @ApiOperation({ summary: 'Update an existing task' })
  @ApiParam({ name: 'taskId', description: 'ClickUp Task ID' })
  @ApiQuery({ name: 'custom_task_ids', required: false, type: Boolean })
  @ApiQuery({ name: 'team_id', required: false, type: String })
  @ApiResponse({ status: 503, description: 'Feature currently disabled' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  updateTask(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Query('custom_task_ids') custom_task_ids?: boolean,
    @Query('team_id') team_id?: string,
  ): { message: string } {
    throw new HttpException(
      'This feature is currently disabled',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  @Delete(':taskId')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'taskId', description: 'ClickUp Task ID' })
  @ApiQuery({ name: 'custom_task_ids', required: false, type: Boolean })
  @ApiQuery({ name: 'team_id', required: false, type: String })
  @ApiResponse({ status: 503, description: 'Feature currently disabled' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  deleteTask(
    @Param('taskId') taskId: string,
    @Query('custom_task_ids') custom_task_ids?: boolean,
    @Query('team_id') team_id?: string,
  ): { message: string } {
    throw new HttpException(
      'This feature is currently disabled',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
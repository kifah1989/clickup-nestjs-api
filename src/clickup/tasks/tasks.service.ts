import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { ClickUpBaseService } from '../common/services/clickup-base.service';
import { ClickUpTask } from '../common/interfaces/clickup-response.interface';
import { CreateTaskDto, UpdateTaskDto } from '../common/dto';

@Injectable()
export class TasksService extends ClickUpBaseService {
  constructor(configService: ConfigService, httpService: HttpService) {
    super(configService, httpService);
  }

  /**
   * Get tasks from a specific list
   */
  getTasksByListId(
    listId: string,
    params?: {
      archived?: boolean;
      page?: number;
      order_by?: 'created' | 'updated' | 'due_date';
      reverse?: boolean;
      subtasks?: boolean;
      statuses?: string[];
      include_closed?: boolean;
      assignees?: number[];
      tags?: string[];
      due_date_gt?: number;
      due_date_lt?: number;
      date_created_gt?: number;
      date_created_lt?: number;
      date_updated_gt?: number;
      date_updated_lt?: number;
      custom_fields?: Array<{ field_id: string; operator: string; value: any }>;
    },
  ): Observable<{ tasks: ClickUpTask[] }> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            queryParams.append(key, JSON.stringify(value));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }

    const endpoint = `/list/${listId}/task${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<{ tasks: ClickUpTask[] }>(endpoint);
  }

  /**
   * Get a specific task by ID
   */
  getTaskById(
    taskId: string,
    params?: {
      custom_task_ids?: boolean;
      team_id?: string;
      include_subtasks?: boolean;
    },
  ): Observable<ClickUpTask> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/task/${taskId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<ClickUpTask>(endpoint);
  }

  /**
   * Create a new task in a list
   */
  createTask(
    listId: string,
    createTaskDto: CreateTaskDto,
    params?: {
      custom_task_ids?: boolean;
      team_id?: string;
    },
  ): Observable<ClickUpTask> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/list/${listId}/task${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.post<ClickUpTask>(endpoint, createTaskDto);
  }

  /**
   * Update an existing task
   */
  updateTask(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
    params?: {
      custom_task_ids?: boolean;
      team_id?: string;
    },
  ): Observable<ClickUpTask> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/task/${taskId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.put<ClickUpTask>(endpoint, updateTaskDto);
  }

  /**
   * Delete a task
   */
  deleteTask(
    taskId: string,
    params?: {
      custom_task_ids?: boolean;
      team_id?: string;
    },
  ): Observable<any> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/task/${taskId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.delete(endpoint);
  }
}

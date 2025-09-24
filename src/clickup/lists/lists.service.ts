import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { ClickUpBaseService } from '../common/services/clickup-base.service';
import { ClickUpList } from '../common/interfaces/clickup-response.interface';

@Injectable()
export class ListsService extends ClickUpBaseService {
  constructor(
    configService: ConfigService,
    httpService: HttpService,
  ) {
    super(configService, httpService);
  }

  /**
   * Get lists in a space
   */
  getListsBySpaceId(
    spaceId: string,
    params?: {
      archived?: boolean;
    },
  ): Observable<{ lists: ClickUpList[] }> {
    const queryParams = new URLSearchParams();
    
    if (params?.archived !== undefined) {
      queryParams.append('archived', params.archived.toString());
    }

    const endpoint = `/space/${spaceId}/list${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<{ lists: ClickUpList[] }>(endpoint);
  }

  /**
   * Get lists in a folder
   */
  getListsByFolderId(
    folderId: string,
    params?: {
      archived?: boolean;
    },
  ): Observable<{ lists: ClickUpList[] }> {
    const queryParams = new URLSearchParams();
    
    if (params?.archived !== undefined) {
      queryParams.append('archived', params.archived.toString());
    }

    const endpoint = `/folder/${folderId}/list${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<{ lists: ClickUpList[] }>(endpoint);
  }

  /**
   * Get a specific list by ID
   */
  getListById(listId: string): Observable<ClickUpList> {
    const endpoint = `/list/${listId}`;
    return this.get<ClickUpList>(endpoint);
  }

  /**
   * Create a new list in a folder
   */
  createListInFolder(
    folderId: string,
    listData: {
      name: string;
      content?: string;
      due_date?: number;
      due_date_time?: boolean;
      priority?: number;
      assignee?: number;
      status?: string;
    },
  ): Observable<ClickUpList> {
    const endpoint = `/folder/${folderId}/list`;
    return this.post<ClickUpList>(endpoint, listData);
  }

  /**
   * Create a new list in a space (folderless)
   */
  createListInSpace(
    spaceId: string,
    listData: {
      name: string;
      content?: string;
      due_date?: number;
      due_date_time?: boolean;
      priority?: number;
      assignee?: number;
      status?: string;
    },
  ): Observable<ClickUpList> {
    const endpoint = `/space/${spaceId}/list`;
    return this.post<ClickUpList>(endpoint, listData);
  }

  /**
   * Update a list
   */
  updateList(
    listId: string,
    listData: {
      name?: string;
      content?: string;
      due_date?: number;
      due_date_time?: boolean;
      priority?: number;
      assignee?: number;
      unset_status?: boolean;
    },
  ): Observable<ClickUpList> {
    const endpoint = `/list/${listId}`;
    return this.put<ClickUpList>(endpoint, listData);
  }

  /**
   * Delete a list
   */
  deleteList(listId: string): Observable<any> {
    const endpoint = `/list/${listId}`;
    return this.delete(endpoint);
  }
}
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { ClickUpBaseService } from '../common/services/clickup-base.service';
import { ClickUpSpace } from '../common/interfaces/clickup-response.interface';

@Injectable()
export class SpacesService extends ClickUpBaseService {
  constructor(configService: ConfigService, httpService: HttpService) {
    super(configService, httpService);
  }

  /**
   * Get spaces in a workspace
   */
  getSpaces(
    workspaceId: string,
    params?: {
      archived?: boolean;
    },
  ): Observable<{ spaces: ClickUpSpace[] }> {
    const queryParams = new URLSearchParams();

    if (params?.archived !== undefined) {
      queryParams.append('archived', params.archived.toString());
    }

    const endpoint = `/team/${workspaceId}/space${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<{ spaces: ClickUpSpace[] }>(endpoint);
  }

  /**
   * Get a specific space by ID
   */
  getSpaceById(spaceId: string): Observable<ClickUpSpace> {
    const endpoint = `/space/${spaceId}`;
    return this.get<ClickUpSpace>(endpoint);
  }

  /**
   * Create a new space
   */
  createSpace(
    workspaceId: string,
    spaceData: {
      name: string;
      multiple_assignees?: boolean;
      features?: any;
    },
  ): Observable<ClickUpSpace> {
    const endpoint = `/team/${workspaceId}/space`;
    return this.post<ClickUpSpace>(endpoint, spaceData);
  }

  /**
   * Update a space
   */
  updateSpace(
    spaceId: string,
    spaceData: {
      name?: string;
      color?: string;
      private?: boolean;
      admin_can_manage?: boolean;
      multiple_assignees?: boolean;
      features?: any;
    },
  ): Observable<ClickUpSpace> {
    const endpoint = `/space/${spaceId}`;
    return this.put<ClickUpSpace>(endpoint, spaceData);
  }

  /**
   * Delete a space
   */
  deleteSpace(spaceId: string): Observable<any> {
    const endpoint = `/space/${spaceId}`;
    return this.delete(endpoint);
  }
}

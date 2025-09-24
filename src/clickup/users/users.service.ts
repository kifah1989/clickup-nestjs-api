import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { ClickUpBaseService } from '../common/services/clickup-base.service';
import {
  ClickUpUser,
  ClickUpWorkspace,
} from '../common/interfaces/clickup-response.interface';

@Injectable()
export class UsersService extends ClickUpBaseService {
  constructor(configService: ConfigService, httpService: HttpService) {
    super(configService, httpService);
  }

  /**
   * Get authorized workspaces (teams)
   */
  getAuthorizedWorkspaces(): Observable<{ teams: ClickUpWorkspace[] }> {
    const endpoint = '/team';
    return this.get<{ teams: ClickUpWorkspace[] }>(endpoint);
  }

  /**
   * Get current user info
   */
  getCurrentUser(): Observable<{ user: ClickUpUser }> {
    const endpoint = '/user';
    return this.get<{ user: ClickUpUser }>(endpoint);
  }

  /**
   * Get workspace members
   */
  getWorkspaceMembers(
    workspaceId: string,
  ): Observable<{ members: ClickUpUser[] }> {
    const endpoint = `/team/${workspaceId}`;
    return this.get<{ members: ClickUpUser[] }>(endpoint);
  }

  /**
   * Invite user to workspace
   */
  inviteUserToWorkspace(
    workspaceId: string,
    userData: {
      email: string;
      admin?: boolean;
      custom_role_id?: number;
    },
  ): Observable<{ user: ClickUpUser }> {
    const endpoint = `/team/${workspaceId}/user`;
    return this.post<{ user: ClickUpUser }>(endpoint, userData);
  }

  /**
   * Remove user from workspace
   */
  removeUserFromWorkspace(
    workspaceId: string,
    userId: string,
  ): Observable<any> {
    const endpoint = `/team/${workspaceId}/user/${userId}`;
    return this.delete(endpoint);
  }

  /**
   * Update user role in workspace
   */
  updateUserRole(
    workspaceId: string,
    userId: string,
    roleData: {
      admin?: boolean;
      custom_role_id?: number;
    },
  ): Observable<{ user: ClickUpUser }> {
    const endpoint = `/team/${workspaceId}/user/${userId}`;
    return this.put<{ user: ClickUpUser }>(endpoint, roleData);
  }
}

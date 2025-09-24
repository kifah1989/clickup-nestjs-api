import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Observable, catchError } from 'rxjs';
import { UsersService } from './users.service';
import { ClickUpUser, ClickUpWorkspace } from '../common/interfaces/clickup-response.interface';

@ApiTags('Users & Workspaces')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('workspaces')
  @ApiOperation({ summary: 'Get authorized workspaces' })
  @ApiResponse({ status: 200, description: 'Workspaces retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getAuthorizedWorkspaces(): Observable<{ teams: ClickUpWorkspace[] }> {
    return this.usersService.getAuthorizedWorkspaces().pipe(
      catchError((error) => {
        throw new HttpException(
          error.response?.data?.message || 'Failed to fetch workspaces',
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({ status: 200, description: 'User info retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getCurrentUser(): Observable<{ user: ClickUpUser }> {
    return this.usersService.getCurrentUser().pipe(
      catchError((error) => {
        throw new HttpException(
          error.response?.data?.message || 'Failed to fetch user info',
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  @Get('workspace/:workspaceId/members')
  @ApiOperation({ summary: 'Get workspace members' })
  @ApiParam({ name: 'workspaceId', description: 'ClickUp Workspace ID' })
  @ApiResponse({ status: 200, description: 'Members retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getWorkspaceMembers(
    @Param('workspaceId') workspaceId: string,
  ): Observable<{ members: ClickUpUser[] }> {
    return this.usersService.getWorkspaceMembers(workspaceId).pipe(
      catchError((error) => {
        throw new HttpException(
          error.response?.data?.message || 'Failed to fetch workspace members',
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  @Post('workspace/:workspaceId/invite')
  @ApiOperation({ summary: 'Invite user to workspace' })
  @ApiParam({ name: 'workspaceId', description: 'ClickUp Workspace ID' })
  @ApiResponse({ status: 201, description: 'User invited successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  inviteUserToWorkspace(
    @Param('workspaceId') workspaceId: string,
    @Body() userData: { email: string; admin?: boolean; custom_role_id?: number },
  ): Observable<{ user: ClickUpUser }> {
    return this.usersService.inviteUserToWorkspace(workspaceId, userData).pipe(
      catchError((error) => {
        throw new HttpException(
          error.response?.data?.message || 'Failed to invite user',
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  @Delete('workspace/:workspaceId/user/:userId')
  @ApiOperation({ summary: 'Remove user from workspace' })
  @ApiParam({ name: 'workspaceId', description: 'ClickUp Workspace ID' })
  @ApiParam({ name: 'userId', description: 'User ID to remove' })
  @ApiResponse({ status: 200, description: 'User removed successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  removeUserFromWorkspace(
    @Param('workspaceId') workspaceId: string,
    @Param('userId') userId: string,
  ): Observable<any> {
    return this.usersService.removeUserFromWorkspace(workspaceId, userId).pipe(
      catchError((error) => {
        throw new HttpException(
          error.response?.data?.message || 'Failed to remove user',
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  @Put('workspace/:workspaceId/user/:userId/role')
  @ApiOperation({ summary: 'Update user role in workspace' })
  @ApiParam({ name: 'workspaceId', description: 'ClickUp Workspace ID' })
  @ApiParam({ name: 'userId', description: 'User ID to update' })
  @ApiResponse({ status: 200, description: 'User role updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  updateUserRole(
    @Param('workspaceId') workspaceId: string,
    @Param('userId') userId: string,
    @Body() roleData: { admin?: boolean; custom_role_id?: number },
  ): Observable<{ user: ClickUpUser }> {
    return this.usersService.updateUserRole(workspaceId, userId, roleData).pipe(
      catchError((error) => {
        throw new HttpException(
          error.response?.data?.message || 'Failed to update user role',
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
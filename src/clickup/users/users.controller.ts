import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import {
  ClickUpUser,
  ClickUpWorkspace,
} from '../common/interfaces/clickup-response.interface';

@ApiTags('Users & Workspaces')
@ApiBearerAuth('JWT-auth')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('workspaces')
  @ApiOperation({ summary: 'Get authorized workspaces' })
  @ApiResponse({
    status: 200,
    description: 'Workspaces retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getAuthorizedWorkspaces(): Observable<{ teams: ClickUpWorkspace[] }> {
    return this.usersService.getAuthorizedWorkspaces();
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({ status: 200, description: 'User info retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getCurrentUser(): Observable<{ user: ClickUpUser }> {
    return this.usersService.getCurrentUser();
  }

  @Get('workspace/:workspaceId/members')
  @ApiOperation({ summary: 'Get workspace members' })
  @ApiParam({ name: 'workspaceId', description: 'ClickUp Workspace ID' })
  @ApiResponse({ status: 200, description: 'Members retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getWorkspaceMembers(
    @Param('workspaceId') workspaceId: string,
  ): Observable<{ members: ClickUpUser[] }> {
    return this.usersService.getWorkspaceMembers(workspaceId);
  }

  @Post('workspace/:workspaceId/invite')
  @ApiOperation({ summary: 'Invite user to workspace' })
  @ApiParam({ name: 'workspaceId', description: 'ClickUp Workspace ID' })
  @ApiResponse({ status: 201, description: 'User invited successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  inviteUserToWorkspace(
    @Param('workspaceId') workspaceId: string,
    @Body()
    userData: { email: string; admin?: boolean; custom_role_id?: number },
  ): Observable<{ user: ClickUpUser }> {
    return this.usersService.inviteUserToWorkspace(workspaceId, userData);
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
    return this.usersService.removeUserFromWorkspace(workspaceId, userId);
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
    return this.usersService.updateUserRole(workspaceId, userId, roleData);
  }
}

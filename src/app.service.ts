import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppInfo(): object {
    return {
      name: 'ClickUp API Integration',
      version: '1.0.0',
      description: 'REST API for interacting with ClickUp API',
      documentation: '/api/docs',
      endpoints: {
        tasks: {
          getByListId: 'GET /api/tasks/list/:listId',
          getById: 'GET /api/tasks/:taskId',
          create: 'POST /api/tasks/list/:listId',
          update: 'PUT /api/tasks/:taskId',
          delete: 'DELETE /api/tasks/:taskId',
        },
        spaces: {
          getByWorkspace: 'GET /api/spaces/workspace/:workspaceId',
          getById: 'GET /api/spaces/:spaceId',
          create: 'POST /api/spaces/workspace/:workspaceId',
          update: 'PUT /api/spaces/:spaceId',
          delete: 'DELETE /api/spaces/:spaceId',
        },
        lists: {
          getBySpace: 'GET /api/lists/space/:spaceId',
          getByFolder: 'GET /api/lists/folder/:folderId',
          getById: 'GET /api/lists/:listId',
          createInSpace: 'POST /api/lists/space/:spaceId',
          createInFolder: 'POST /api/lists/folder/:folderId',
          update: 'PUT /api/lists/:listId',
          delete: 'DELETE /api/lists/:listId',
        },
        users: {
          getWorkspaces: 'GET /api/users/workspaces',
          getCurrentUser: 'GET /api/users/me',
          getWorkspaceMembers: 'GET /api/users/workspace/:workspaceId/members',
          inviteUser: 'POST /api/users/workspace/:workspaceId/invite',
          removeUser: 'DELETE /api/users/workspace/:workspaceId/user/:userId',
          updateUserRole:
            'PUT /api/users/workspace/:workspaceId/user/:userId/role',
        },
      },
      setup: {
        step1:
          'Set your ClickUp API token in .env file (CLICKUP_API_TOKEN=pk_...)',
        step2: 'Visit /api/docs for interactive API documentation',
        step3:
          'Test the endpoints using your ClickUp workspace, space, and list IDs',
      },
    };
  }

  getHealth(): object {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}

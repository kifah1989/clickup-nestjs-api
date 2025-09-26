import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppInfo(): object {
    return {
      name: 'ClickUp API Integration',
      version: '1.0.0',
      description:
        'Enterprise-grade REST API for interacting with ClickUp API with JWT authentication and RBAC',
      documentation: '/api/docs',
      security: {
        authentication: 'JWT Bearer Token',
        roles: ['ADMIN', 'EDITOR', 'VIEWER'],
        rateLimiting:
          '10 requests/minute, 100 requests/10 minutes, 1000 requests/hour',
      },
      endpoints: {
        public: {
          appInfo: 'GET /',
          health: 'GET /health',
          login: 'POST /auth/login',
          register: 'POST /auth/register',
        },
        auth: {
          login: {
            method: 'POST',
            path: '/auth/login',
            description: 'Authenticate user and receive JWT token',
            body: '{ email: string, password: string }',
            access: 'Public',
          },
          register: {
            method: 'POST',
            path: '/auth/register',
            description: 'Register new user',
            body: '{ email: string, password: string, role?: UserRole }',
            access: 'Public',
          },
          profile: {
            method: 'POST',
            path: '/auth/profile',
            description: 'Get current user profile',
            access: 'Requires JWT',
          },
        },
        tasks: {
          getByListId: {
            method: 'GET',
            path: '/api/tasks/list/:listId',
            access: 'JWT Required (All Roles)',
          },
          getById: {
            method: 'GET',
            path: '/api/tasks/:taskId',
            access: 'JWT Required (All Roles)',
          },
          create: {
            method: 'POST',
            path: '/api/tasks/list/:listId',
            access: 'JWT Required (EDITOR, ADMIN)',
          },
          update: {
            method: 'PUT',
            path: '/api/tasks/:taskId',
            access: 'JWT Required (EDITOR, ADMIN)',
          },
          delete: {
            method: 'DELETE',
            path: '/api/tasks/:taskId',
            access: 'JWT Required (ADMIN Only)',
          },
        },
        spaces: {
          getByWorkspace: {
            method: 'GET',
            path: '/api/spaces/workspace/:workspaceId',
            access: 'JWT Required (All Roles)',
          },
          getById: {
            method: 'GET',
            path: '/api/spaces/:spaceId',
            access: 'JWT Required (All Roles)',
          },
          create: {
            method: 'POST',
            path: '/api/spaces/workspace/:workspaceId',
            access: 'JWT Required (EDITOR, ADMIN)',
          },
          update: {
            method: 'PUT',
            path: '/api/spaces/:spaceId',
            access: 'JWT Required (EDITOR, ADMIN)',
          },
          delete: {
            method: 'DELETE',
            path: '/api/spaces/:spaceId',
            access: 'JWT Required (ADMIN Only)',
          },
        },
        lists: {
          getBySpace: {
            method: 'GET',
            path: '/api/lists/space/:spaceId',
            access: 'JWT Required (All Roles)',
          },
          getByFolder: {
            method: 'GET',
            path: '/api/lists/folder/:folderId',
            access: 'JWT Required (All Roles)',
          },
          getById: {
            method: 'GET',
            path: '/api/lists/:listId',
            access: 'JWT Required (All Roles)',
          },
          createInSpace: {
            method: 'POST',
            path: '/api/lists/space/:spaceId',
            access: 'JWT Required (EDITOR, ADMIN)',
          },
          createInFolder: {
            method: 'POST',
            path: '/api/lists/folder/:folderId',
            access: 'JWT Required (EDITOR, ADMIN)',
          },
          update: {
            method: 'PUT',
            path: '/api/lists/:listId',
            access: 'JWT Required (EDITOR, ADMIN)',
          },
          delete: {
            method: 'DELETE',
            path: '/api/lists/:listId',
            access: 'JWT Required (ADMIN Only)',
          },
        },
        users: {
          getWorkspaces: {
            method: 'GET',
            path: '/api/users/workspaces',
            access: 'JWT Required (All Roles)',
          },
          getCurrentUser: {
            method: 'GET',
            path: '/api/users/me',
            access: 'JWT Required (All Roles)',
          },
          getWorkspaceMembers: {
            method: 'GET',
            path: '/api/users/workspace/:workspaceId/members',
            access: 'JWT Required (All Roles)',
          },
          inviteUser: {
            method: 'POST',
            path: '/api/users/workspace/:workspaceId/invite',
            access: 'JWT Required (ADMIN Only)',
          },
          removeUser: {
            method: 'DELETE',
            path: '/api/users/workspace/:workspaceId/user/:userId',
            access: 'JWT Required (ADMIN Only)',
          },
          updateUserRole: {
            method: 'PUT',
            path: '/api/users/workspace/:workspaceId/user/:userId/role',
            access: 'JWT Required (ADMIN Only)',
          },
        },
      },
      testCredentials: {
        admin: {
          email: 'admin@clickup-api.com',
          password: 'Admin123!',
          role: 'ADMIN',
          access: 'Full access to all operations',
        },
        editor: {
          email: 'editor@clickup-api.com',
          password: 'Editor123!',
          role: 'EDITOR',
          access: 'Create, Read, Update operations',
        },
        viewer: {
          email: 'viewer@clickup-api.com',
          password: 'Viewer123!',
          role: 'VIEWER',
          access: 'Read-only operations',
        },
      },
      setup: {
        step1: 'Run "npm run db:seed" to create test users',
        step2:
          'Set your ClickUp API token in .env file (CLICKUP_API_TOKEN=pk_...)',
        step3: 'Login via POST /auth/login to get JWT token',
        step4: 'Include token in Authorization header: "Bearer YOUR_JWT_TOKEN"',
        step5: 'Visit /api/docs for interactive Swagger API documentation',
        step6:
          'Test the endpoints using your ClickUp workspace, space, and list IDs',
      },
      environment: {
        required: [
          'DATABASE_URL',
          'JWT_SECRET',
          'JWT_EXPIRES_IN',
          'CLICKUP_API_TOKEN',
          'CLICKUP_API_BASE_URL',
        ],
        optional: [
          'PORT (default: 3000)',
          'NODE_ENV (default: development)',
          'THROTTLE_TTL (default: 60000)',
          'THROTTLE_LIMIT (default: 10)',
        ],
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

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# ClickUp API Enterprise-Grade NestJS Backend

## 🛡️ PROJECT STATUS: PRODUCTION-READY ✅

This is a **complete enterprise-grade security-hardened NestJS application** that provides a secure REST API interface for the ClickUp API with comprehensive authentication, authorization, and monitoring capabilities.

## 🔐 SECURITY IMPLEMENTATION COMPLETE

### Authentication & Authorization ✅

- [x] JWT Authentication with @nestjs/jwt and @nestjs/passport
- [x] Role-Based Access Control (RBAC): ADMIN, EDITOR, VIEWER
- [x] bcrypt password hashing with proper salt rounds
- [x] JWT token management with configurable expiration
- [x] Secure login/register endpoints with validation
- [x] Global authentication guards with public route exceptions
- [x] Profile endpoint for current user information

### Database Integration ✅

- [x] PostgreSQL database with Prisma ORM
- [x] User management with complete lifecycle operations
- [x] API audit logging with comprehensive request tracking
- [x] Database migrations and seeding capabilities
- [x] Connection security and query optimization
- [x] Type-safe database operations with Prisma Client

### Security Hardening ✅

- [x] Multi-tier rate limiting (10/min, 100/10min, 1000/hour)
- [x] Input validation with comprehensive DTOs
- [x] Environment security with @nestjs/config
- [x] CORS protection configured for production
- [x] HTTP security headers enabled
- [x] SQL injection protection via Prisma ORM
- [x] Sensitive data redaction in logs

### Monitoring & Logging ✅

- [x] Winston structured logging with multiple levels
- [x] API request/response logging middleware
- [x] Database operation logging and error tracking
- [x] Performance monitoring with request timing
- [x] Error handling with comprehensive stack traces
- [x] Security event logging (auth failures, rate limits)
- [x] Separate error.log and combined.log files

### API Documentation ✅

- [x] Swagger/OpenAPI documentation with security schemas
- [x] JWT bearer token authentication in Swagger UI
- [x] Comprehensive endpoint documentation
- [x] Role-based access control documentation
- [x] Interactive API testing at /api/docs
- [x] Security response examples and error codes

## 🏗️ ARCHITECTURE OVERVIEW

### Core Modules

- **AuthModule**: JWT authentication and user registration
- **UsersModule**: User management and profile operations
- **PrismaModule**: Database integration and ORM services
- **ClickUpModule**: Secure ClickUp API integration wrapper
  - TasksModule, SpacesModule, ListsModule, UsersModule (ClickUp)

### Security Layers

- **Guards**: JwtAuthGuard, GlobalJwtAuthGuard, RolesGuard
- **Middleware**: ApiLoggingMiddleware for request auditing
- **Validation**: class-validator DTOs for input sanitization
- **Rate Limiting**: ThrottlerModule for DDoS protection

### Database Schema

- **User**: Authentication and authorization data
- **ApiLog**: Comprehensive request/response audit trail
- **UserRole**: ADMIN, EDITOR, VIEWER enum

## 🚀 DEVELOPMENT GUIDELINES

### Project Structure

```
src/
├── auth/                     # 🔐 JWT authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   ├── global-jwt-auth.guard.ts
│   ├── roles.guard.ts
│   ├── dto/
│   │   └── auth.dto.ts
│   └── decorators/
│       └── public.decorator.ts
├── users/                    # 👥 User management module
│   ├── users.module.ts
│   └── users.service.ts
├── prisma/                   # 💾 Database integration
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── clickup/                  # 🎯 ClickUp API integration
│   ├── tasks/
│   ├── spaces/
│   ├── lists/
│   ├── users/
│   └── common/
├── common/                   # 🔧 Shared utilities
│   └── middleware/
│       └── api-logging.middleware.ts
├── app.module.ts            # 🏛️ Main application configuration
├── app.controller.ts        # 📍 Public endpoints (health, info)
└── main.ts                  # 🚀 Application bootstrap

prisma/
├── schema.prisma            # Database schema
├── migrations/              # Database migrations
└── seed.ts                  # Default user seeding

logs/
├── error.log               # Error logs only
└── combined.log            # All application logs
```

### Key Files

- `src/auth/auth.service.ts` - JWT authentication logic with bcrypt
- `src/auth/auth.controller.ts` - Login, register, and profile endpoints
- `src/auth/jwt.strategy.ts` - JWT validation strategy
- `src/auth/global-jwt-auth.guard.ts` - Global authentication with public routes
- `src/users/users.service.ts` - User management with password hashing
- `src/prisma/prisma.service.ts` - Database connection management
- `src/common/middleware/api-logging.middleware.ts` - Request logging
- `prisma/schema.prisma` - Database schema and models
- `prisma/seed.ts` - Default user seeding script

### Default Test Credentials

| Role   | Email                  | Password   | Access             |
| ------ | ---------------------- | ---------- | ------------------ |
| ADMIN  | admin@clickup-api.com  | Admin123!  | Full access        |
| EDITOR | editor@clickup-api.com | Editor123! | Create/Read/Update |
| VIEWER | viewer@clickup-api.com | Viewer123! | Read-only          |

## 🛠️ DEVELOPMENT COMMANDS

### Application Commands

```bash
npm run start          # Start in development mode
npm run start:dev      # Start with hot reload
npm run start:debug    # Debug mode
npm run build          # Build for production
npm run start:prod     # Start production server
npm run lint           # Run ESLint
npm run format         # Format with Prettier
```

### Database Commands

```bash
npm run db:seed              # Seed default users
npx prisma migrate dev       # Run database migrations
npx prisma generate          # Generate Prisma client
npx prisma studio            # Open database GUI
npx prisma migrate reset     # Reset database (dev only)
npx prisma db push           # Push schema changes
npx prisma db pull           # Pull schema from database
```

### Testing Commands

```bash
npm run test           # Unit tests
npm run test:e2e       # End-to-end tests
npm run test:cov       # Coverage report
```

### Security Testing

```bash
# Login and get JWT token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@clickup-api.com","password":"Admin123!"}'

# Test protected endpoint
curl -X GET http://localhost:3000/api/users/workspaces \
  -H "Authorization: Bearer JWT_TOKEN_HERE"

# Test rate limiting
for i in {1..15}; do
  curl -X GET http://localhost:3000/health
done
```

## 🔧 CONFIGURATION

### Required Environment Variables

```env
# Database (REQUIRED)
DATABASE_URL="postgresql://user:pass@localhost:5432/clickup_api"

# Security (REQUIRED)
JWT_SECRET=your_very_secure_jwt_secret_min_32_chars
JWT_EXPIRES_IN=1d

# ClickUp API (REQUIRED)
CLICKUP_API_TOKEN=pk_your_personal_api_token_here
CLICKUP_API_BASE_URL=https://api.clickup.com/api/v2

# Application
PORT=3000
NODE_ENV=development

# Rate Limiting
THROTTLE_TTL=60000
THROTTLE_LIMIT=10
```

## 📚 ENDPOINTS OVERVIEW

### Public Endpoints (No Authentication)

- `GET /` - Application info
- `GET /health` - Health check
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Protected Endpoints (JWT Required)

- `GET /auth/profile` - Current user profile
- All `/api/*` endpoints require JWT authentication

### ClickUp API Endpoints (All JWT Protected)

#### Tasks (`/api/tasks/*`)

- `GET /api/tasks/list/:listId` - Get tasks from list
- `GET /api/tasks/:taskId` - Get specific task
- `POST /api/tasks/list/:listId` - Create task (EDITOR+)
- `PUT /api/tasks/:taskId` - Update task (EDITOR+)
- `DELETE /api/tasks/:taskId` - Delete task (ADMIN)

#### Spaces (`/api/spaces/*`)

- `GET /api/spaces/workspace/:workspaceId` - Get workspace spaces
- `GET /api/spaces/:spaceId` - Get specific space
- `POST /api/spaces/workspace/:workspaceId` - Create space (EDITOR+)
- `PUT /api/spaces/:spaceId` - Update space (EDITOR+)
- `DELETE /api/spaces/:spaceId` - Delete space (ADMIN)

#### Lists (`/api/lists/*`)

- `GET /api/lists/space/:spaceId` - Get space lists
- `GET /api/lists/folder/:folderId` - Get lists in folder
- `GET /api/lists/:listId` - Get specific list
- `POST /api/lists/space/:spaceId` - Create list (EDITOR+)
- `POST /api/lists/folder/:folderId` - Create list in folder (EDITOR+)
- `PUT /api/lists/:listId` - Update list (EDITOR+)
- `DELETE /api/lists/:listId` - Delete list (ADMIN)

#### Users & Workspaces (`/api/users/*`)

- `GET /api/users/workspaces` - Get authorized workspaces
- `GET /api/users/me` - Get current user info
- `GET /api/users/workspace/:workspaceId/members` - Get members
- `POST /api/users/workspace/:workspaceId/invite` - Invite user (ADMIN)
- `DELETE /api/users/workspace/:workspaceId/user/:userId` - Remove user (ADMIN)
- `PUT /api/users/workspace/:workspaceId/user/:userId/role` - Update role (ADMIN)

## 🎯 CURRENT PROJECT STATE

### ✅ COMPLETED FEATURES

- Complete enterprise security implementation
- Production-ready authentication and authorization
- Comprehensive database integration with audit logging
- Multi-tier rate limiting and DDoS protection
- Structured logging with Winston
- Complete Swagger API documentation
- Default user seeding for immediate testing
- Health check and monitoring endpoints
- Public route exceptions with decorator
- Role-based access control on all endpoints

### 🏢 PRODUCTION READY

This application is **production-ready** with:

- Enterprise-grade security hardening
- Scalable architecture with proper separation of concerns
- Comprehensive error handling and logging
- Database integration with migration support
- Complete documentation and testing capabilities
- Docker deployment support

## 💡 DEVELOPMENT BEST PRACTICES

When working with this codebase:

1. **Security First**: All new endpoints should use JWT authentication by default
2. **Public Routes**: Use `@Public()` decorator for routes that don't need authentication
3. **Role-Based Access**: Use `@Roles()` decorator for role-specific operations
4. **Input Validation**: Use DTOs with class-validator for all inputs
5. **Error Handling**: Log all errors with appropriate security context
6. **Database Operations**: Use Prisma ORM for type-safe database queries
7. **Testing**: Test authentication, authorization, and rate limiting
8. **Documentation**: Update Swagger documentation for new endpoints
9. **Logging**: Use Winston logger, avoid console.log in production
10. **Environment**: Never commit sensitive data, use .env files

This is a **complete, secure, production-ready enterprise application** suitable for real-world deployment.

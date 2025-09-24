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

### Database Integration ✅

- [x] PostgreSQL database with Prisma ORM v6.16.2
- [x] User management with complete lifecycle operations
- [x] API audit logging with comprehensive request tracking
- [x] Database migrations and seeding capabilities
- [x] Connection security and query optimization
- [x] Type-safe database operations with Prisma Client

### Security Hardening ✅

- [x] Multi-tier rate limiting (10/min, 100/hour, 1000/day)
- [x] Input validation with comprehensive DTOs
- [x] Environment security with @nestjs/config
- [x] CORS protection configured for production
- [x] HTTP security headers enabled
- [x] SQL injection protection via Prisma ORM

### Monitoring & Logging ✅

- [x] Winston structured logging with multiple levels
- [x] API request/response logging middleware
- [x] Database operation logging and error tracking
- [x] Performance monitoring with request timing
- [x] Error handling with comprehensive stack traces
- [x] Security event logging (auth failures, rate limits)

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

- **Guards**: JwtAuthGuard, RolesGuard for endpoint protection
- **Middleware**: ApiLoggingMiddleware for request auditing
- **Validation**: class-validator DTOs for input sanitization
- **Rate Limiting**: ThrottlerModule for DDoS protection

### Database Schema

- **User**: Authentication and authorization data
- **ApiLog**: Comprehensive request/response audit trail

## 🚀 DEVELOPMENT GUIDELINES

### Project Structure

```
src/
├── auth/           # 🔐 JWT authentication module
├── users/          # 👥 User management module
├── prisma/         # 💾 Database integration module
├── clickup/        # 🎯 ClickUp API integration modules
├── common/         # 🔧 Shared utilities and middleware
└── app.module.ts   # 🏛️ Main application configuration
```

### Key Files

- `src/auth/auth.service.ts` - JWT authentication logic
- `src/users/users.service.ts` - User management with bcrypt
- `src/prisma/prisma.service.ts` - Database connection management
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
npm run start:dev      # Start with hot reload
npm run build          # Build for production
npm run start:prod     # Start production server
```

### Database Commands

```bash
npm run db:seed        # Seed default users
npx prisma migrate dev # Run database migrations
npx prisma studio      # Open database GUI
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

# Rate Limiting (OPTIONAL)
THROTTLE_TTL=60000
THROTTLE_LIMIT=10
```

## 📚 DOCUMENTATION

### Available Documentation

- `README.md` - Complete project documentation
- `README-SECURITY.md` - Security implementation guide
- `DEFAULT-CREDENTIALS.md` - Test account information
- `IMPLEMENTATION-SUMMARY.md` - Technical implementation details

### API Documentation

- **Swagger UI**: http://localhost:3000/api/docs
- **Authentication**: JWT Bearer token required for all ClickUp endpoints
- **Rate Limiting**: 10 requests/minute, 100/hour, 1000/day
- **Role-Based Access**: Different permissions for ADMIN/EDITOR/VIEWER

## 🎯 CURRENT PROJECT STATE

### ✅ COMPLETED FEATURES

- Complete enterprise security implementation
- Production-ready authentication and authorization
- Comprehensive database integration with audit logging
- Multi-tier rate limiting and DDoS protection
- Structured logging and monitoring capabilities
- Complete API documentation with security schemas
- Default user seeding for immediate testing

### 🏢 PRODUCTION READY

This application is **production-ready** with:

- Enterprise-grade security hardening
- Scalable architecture with proper separation of concerns
- Comprehensive error handling and logging
- Database integration with migration support
- Complete documentation and testing capabilities

### 🚀 DEPLOYMENT STATUS

- **Development**: Fully functional with hot reload
- **Testing**: Complete with default seeded accounts
- **Production**: Ready with proper environment configuration
- **Documentation**: Comprehensive guides and API docs available

## 💡 DEVELOPMENT BEST PRACTICES

When working with this codebase:

1. **Security First**: All new endpoints should use JWT authentication
2. **Role-Based Access**: Implement proper role checks for sensitive operations
3. **Input Validation**: Use DTOs with class-validator for all inputs
4. **Error Handling**: Log all errors with appropriate security context
5. **Database Operations**: Use Prisma ORM for type-safe database queries
6. **Testing**: Test authentication and authorization thoroughly
7. **Documentation**: Update Swagger documentation for new endpoints

This is a **complete, secure, production-ready enterprise application** suitable for real-world deployment.

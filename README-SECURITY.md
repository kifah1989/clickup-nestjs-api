# ClickUp API NestJS Integration with Enterprise Security

A production-ready, secure REST API wrapper for the ClickUp API built with NestJS, featuring comprehensive authentication, authorization, rate limiting, and monitoring capabilities.

## 🚀 Features

### Core API Integration
- 🔌 **Complete ClickUp API Integration**: Full CRUD operations for Tasks, Spaces, Lists, and Users
- 📝 **Interactive Documentation**: Auto-generated Swagger/OpenAPI documentation with JWT authentication
- 🛡️ **Input Validation**: Comprehensive request validation using DTOs and class-validator
- 🎯 **TypeScript**: Fully typed codebase with strict TypeScript configuration

### 🔐 Security & Authentication
- 🔑 **JWT Authentication**: Secure token-based authentication with Passport.js
- 👥 **Role-Based Access Control**: Admin, Editor, and Viewer roles with proper authorization
- 🛡️ **Password Security**: bcrypt-based password hashing with configurable rounds
- 🚦 **Rate Limiting**: Configurable throttling with multiple time windows (short/medium/long-term)
- 🔒 **Environment Security**: Secure environment variable validation and management
- 🚪 **Global Authentication**: All ClickUp routes protected by default with public route exceptions

### 💾 Database & Monitoring
- 🗄️ **Prisma ORM**: Type-safe database operations with PostgreSQL
- 📊 **API Usage Logging**: Comprehensive API call tracking per user
- 📝 **Structured Logging**: Winston-based logging with sensitive data redaction
- 🏥 **Health Checks**: Built-in health monitoring endpoints
- 📈 **Usage Analytics**: Track endpoint usage, response times, and error rates

## 🔧 Prerequisites

- Node.js 16+ and npm
- PostgreSQL database
- ClickUp API Personal Token

## ⚡ Quick Start

### 1. Installation

```bash
git clone <repository-url>
cd clickup-nestjs-api
npm install
```

### 2. Database Setup

```bash
# Set up your PostgreSQL database
# Update DATABASE_URL in .env file

# Run database migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate
```

### 3. Environment Configuration

```bash
cp .env.example .env
```

Update your `.env` file with proper values:

```env
# ClickUp API Configuration
CLICKUP_API_TOKEN=pk_your_personal_api_token_here
CLICKUP_API_BASE_URL=https://api.clickup.com/api/v2

# Application Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/clickup_api?schema=public"

# Security Configuration
JWT_SECRET=your_very_secure_jwt_secret_change_this_in_production_min_32_chars_long
JWT_EXPIRES_IN=1d

# Rate Limiting Configuration
THROTTLE_TTL=60000          # 1 minute in milliseconds
THROTTLE_LIMIT=10           # 10 requests per minute
```

### 4. Start the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### 5. Access the Application

- **API Server**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/health

## 🔐 Authentication & Authorization

### User Registration

```bash
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "role": "VIEWER"  // Optional: ADMIN, EDITOR, VIEWER
}
```

### User Login

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}

# Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "VIEWER",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### Using JWT Token

```bash
# Include JWT token in Authorization header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Example authenticated request
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     http://localhost:3000/api/tasks/list/YOUR_LIST_ID
```

### User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **ADMIN** | Full access to all endpoints, user management, system administration |
| **EDITOR** | Create, read, update, and delete ClickUp resources |
| **VIEWER** | Read-only access to ClickUp resources |

## 📚 API Endpoints

### 🔓 Public Endpoints (No Authentication Required)
- `GET /` - Application information
- `GET /health` - Health check
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /api/docs` - Swagger documentation

### 🔒 Protected Endpoints (JWT Required)

#### Authentication
- `POST /auth/profile` - Get current user profile

#### ClickUp Integration
- **Tasks**: `/api/tasks/*` - Complete task management
  - `GET /api/tasks/list/:listId` - Get tasks from a specific list
  - `GET /api/tasks/:taskId` - Get a specific task by ID
  - `POST /api/tasks/list/:listId` - Create a new task in a list (EDITOR+ required)
  - `PUT /api/tasks/:taskId` - Update an existing task (EDITOR+ required)
  - `DELETE /api/tasks/:taskId` - Delete a task (EDITOR+ required)

- **Spaces**: `/api/spaces/*` - Space operations
- **Lists**: `/api/lists/*` - List management  
- **Users**: `/api/users/*` - User information

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run start:dev      # Start with hot reload
npm run start:debug    # Start in debug mode

# Building
npm run build          # Build for production
npm run start:prod     # Run production build

# Database Operations
npx prisma migrate dev # Run database migrations
npx prisma generate    # Generate Prisma client
npx prisma studio      # Open Prisma Studio (Database GUI)

# Testing
npm run test           # Run unit tests
npm run test:e2e       # Run e2e tests
npm run test:cov       # Run tests with coverage

# Code Quality
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

### Project Structure

```
src/
├── app.module.ts              # Main application module with security config
├── main.ts                    # Application bootstrap with Swagger setup
├── auth/                      # Authentication & authorization
│   ├── auth.module.ts         # Auth module with JWT configuration
│   ├── auth.service.ts        # Authentication business logic
│   ├── auth.controller.ts     # Login/register endpoints
│   ├── jwt.strategy.ts        # JWT validation strategy
│   ├── jwt-auth.guard.ts      # JWT authentication guard
│   ├── global-jwt-auth.guard.ts # Global auth guard with public routes
│   ├── roles.guard.ts         # Role-based authorization guard
│   ├── dto/
│   │   └── auth.dto.ts        # Authentication DTOs
│   └── decorators/
│       └── public.decorator.ts # Public route decorator
├── users/                     # User management
│   ├── users.module.ts        # Users module
│   └── users.service.ts       # User operations and API logging
├── prisma/                    # Database service
│   ├── prisma.module.ts       # Prisma module configuration
│   └── prisma.service.ts      # Database connection service
├── common/                    # Shared utilities
│   └── middleware/
│       └── api-logging.middleware.ts # API usage logging
├── clickup/                   # ClickUp API integration (protected)
│   ├── common/               # Shared DTOs and interfaces
│   ├── tasks/                # Task operations
│   ├── spaces/               # Space operations
│   ├── lists/                # List operations
│   └── users/                # User operations
├── logs/                      # Application logs
│   ├── error.log             # Error logs only
│   └── combined.log          # All logs
└── prisma/                    # Database schema and migrations
    ├── schema.prisma         # Database schema
    └── migrations/           # Database migration files
```

### Database Schema

```prisma
enum UserRole {
  ADMIN
  EDITOR
  VIEWER
}

model User {
  id           Int       @id @default(autoincrement())
  email        String    @unique
  passwordHash String
  role         UserRole  @default(VIEWER)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  apiLogs      ApiLog[]  // API usage tracking
}

model ApiLog {
  id         Int      @id @default(autoincrement())
  userId     Int
  endpoint   String   // API endpoint called
  method     String   // HTTP method (GET, POST, etc.)
  timestamp  DateTime @default(now())
  statusCode Int      // HTTP response status
  user       User     @relation(fields: [userId], references: [id])
}
```

## 🔒 Security Features

### Authentication & Authorization
- **JWT Token-Based Authentication**: Secure, stateless authentication
- **Role-Based Access Control (RBAC)**: Fine-grained permissions
- **Password Security**: bcrypt hashing with configurable salt rounds
- **Token Expiration**: Configurable JWT token expiration times
- **Global Authentication**: All ClickUp routes protected by default

### Rate Limiting & DDoS Protection
```typescript
// Multiple rate limiting tiers
{
  name: 'short',
  ttl: 60000,    // 1 minute
  limit: 10,     // 10 requests per minute
},
{
  name: 'medium',
  ttl: 600000,   // 10 minutes  
  limit: 100,    // 100 requests per 10 minutes
},
{
  name: 'long',
  ttl: 3600000,  // 1 hour
  limit: 1000,   // 1000 requests per hour
}
```

### Data Protection & Privacy
- **Sensitive Data Redaction**: Automatic redaction of tokens/passwords in logs
- **Environment Variable Validation**: Required variables checked at startup
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Input Validation**: Comprehensive request validation with class-validator

### Monitoring & Logging
- **Structured Logging**: JSON-formatted logs with Winston
- **API Usage Tracking**: Per-user API call logging to database
- **Error Monitoring**: Comprehensive error logging with stack traces
- **Health Checks**: Built-in health monitoring endpoints

## 🚀 Production Deployment

### Environment Variables Checklist

Ensure these are properly configured in production:

```env
# Security (CRITICAL)
NODE_ENV=production
JWT_SECRET=your_very_secure_production_jwt_secret_at_least_32_characters_long

# Rate Limiting
THROTTLE_TTL=60000
THROTTLE_LIMIT=10

# Database
DATABASE_URL=your_production_database_url

# ClickUp API
CLICKUP_API_TOKEN=your_production_clickup_token
```

### Production Security Checklist

- [ ] **Change Default JWT Secret**: Use a cryptographically secure secret (32+ chars)
- [ ] **Configure HTTPS/TLS**: Never run in production without SSL/TLS
- [ ] **Set Up Proper CORS**: Configure allowed origins for your frontend
- [ ] **Database Security**: Use connection pooling and secure credentials
- [ ] **Rate Limiting**: Adjust limits based on your usage patterns
- [ ] **Logging**: Set up centralized logging (ELK stack, Datadog, etc.)
- [ ] **Monitoring**: Configure health checks and alerting
- [ ] **Backup Strategy**: Regular database backups
- [ ] **Network Security**: Use VPCs, security groups, firewalls
- [ ] **Secret Management**: Use proper secret management (AWS Secrets Manager, etc.)

### Docker Deployment (Optional)

```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## 📊 Monitoring & Analytics

### API Usage Tracking

Every authenticated API call is logged with:
- User ID and email
- Endpoint accessed
- HTTP method
- Response status code
- Timestamp
- Response time

### Log Files

- `logs/error.log` - Error logs only
- `logs/combined.log` - All application logs
- Sensitive data (tokens, passwords) automatically redacted

### Health Monitoring

```bash
# Check application health
GET /health

# Response
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "memory_heap": { "status": "up" }
  }
}
```

## 🧪 Testing

### API Testing Examples

```bash
# 1. Register a new user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "securepassword123",
    "role": "EDITOR"
  }'

# 2. Login and get JWT token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "securepassword123"
  }'

# 3. Use JWT token for authenticated requests
curl -X GET http://localhost:3000/api/tasks/list/YOUR_LIST_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# 4. Test rate limiting (should get 429 after limit)
for i in {1..15}; do
  curl -X GET http://localhost:3000/health
done
```

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🛠️ Customization

### Adding New Roles

1. Update the `UserRole` enum in `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name add_new_role`
3. Update role validation in DTOs
4. Add role-specific guards where needed

### Custom Rate Limits

```typescript
// In specific controllers
@Throttle({ short: { limit: 5, ttl: 60000 } })
@Post('sensitive-endpoint')
async sensitiveOperation() {
  // Custom rate limit for sensitive operations
}
```

### Adding New Middleware

```typescript
// In app.module.ts
export class AppModule implements NestMiddleware {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiLoggingMiddleware)
      .forRoutes('*'); // Apply to all routes
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Ensure all tests pass (`npm run test`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Contribution Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation for API changes
- Ensure security best practices are followed
- Test with different user roles

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **JWT_SECRET not set**: Ensure JWT_SECRET is configured in your .env file
2. **Database connection failed**: Check your DATABASE_URL and ensure PostgreSQL is running
3. **Rate limit exceeded**: Wait for the rate limit window to reset or increase limits
4. **Permission denied**: Ensure your user has the correct role for the operation
5. **CORS issues**: Configure CORS settings in main.ts for your frontend domain

### Debug Mode

```bash
# Enable debug logging
NODE_ENV=development npm run start:dev

# Check logs
tail -f logs/combined.log
```

---

**Built with ❤️ for production environments**

*Security-first • Scalable • Production-ready*
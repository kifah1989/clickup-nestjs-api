# ClickUp API Enterprise-Grade NestJS Integration

A secure, production-ready NestJS application that provides an enterprise-grade REST API interface for the ClickUp API with comprehensive security features including JWT authentication, role-based authorization, rate limiting, and database integration.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm
- PostgreSQL 12+
- ClickUp account with API access

### Installation

```bash
# Clone and install
git clone <repository-url>
cd clickup-nestjs-api
npm install

# Database setup
npx prisma migrate dev --name init
npx prisma generate

# Configure environment
cp .env.example .env
# Update .env with your credentials

# Seed default users
npm run db:seed

# Start development server
npm run start:dev
```

### Default Test Accounts

| Role       | Email                    | Password     | Access Level         |
| ---------- | ------------------------ | ------------ | -------------------- |
| **ADMIN**  | `admin@clickup-api.com`  | `Admin123!`  | Full system access   |
| **EDITOR** | `editor@clickup-api.com` | `Editor123!` | Create, read, update |
| **VIEWER** | `viewer@clickup-api.com` | `Viewer123!` | Read-only access     |

⚠️ **Security Note**: Change these credentials immediately in production environments.

### Quick Authentication Test

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@clickup-api.com","password":"Admin123!"}'

# Use token for protected endpoints
curl -X GET http://localhost:3000/api/users/workspaces \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Access Points:**

- 🚀 **API Server**: http://localhost:3000
- 📚 **Swagger Docs**: http://localhost:3000/api/docs
- 🔐 **Health Check**: http://localhost:3000/health

## 🛡️ Security Features

### Authentication & Authorization

- **JWT Authentication**: Secure token-based authentication with Passport.js
- **Role-Based Access Control (RBAC)**: Admin, Editor, and Viewer roles
- **Password Security**: bcrypt hashing with configurable salt rounds
- **Global Protection**: All ClickUp routes secured by default

### Security Hardening

- **Multi-Tier Rate Limiting**:
  - Short: 10 requests/minute
  - Medium: 100 requests/10 minutes
  - Long: 1000 requests/hour
- **Input Validation**: Comprehensive DTOs with class-validator
- **SQL Injection Protection**: Prisma ORM query protection
- **CORS & Security Headers**: Production-ready configurations

### Monitoring & Logging

- **Structured Logging**: Winston with multiple log levels
- **API Audit Trail**: Database logging of all API requests
- **Performance Metrics**: Request timing and monitoring
- **Security Events**: Authentication failures and rate limit violations

## 📁 Project Structure

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

## 🔧 Configuration

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

### Getting Your ClickUp API Token

1. Log in to your ClickUp account
2. Navigate to Settings → Apps
3. Click "Generate" under API Token
4. Copy the token (starts with `pk_`)

## 📚 API Documentation

### Interactive Documentation

Visit **http://localhost:3000/api/docs** for complete Swagger documentation with JWT authentication support.

### Authentication Endpoints

| Endpoint         | Method | Description       | Authentication |
| ---------------- | ------ | ----------------- | -------------- |
| `/auth/register` | POST   | Register new user | None           |
| `/auth/login`    | POST   | Login and get JWT | None           |
| `/auth/profile`  | GET    | Get current user  | JWT Required   |

### Public Endpoints

| Endpoint  | Method | Description         |
| --------- | ------ | ------------------- |
| `/`       | GET    | Application info    |
| `/health` | GET    | Health check status |

### ClickUp API Endpoints (All JWT Protected)

#### Tasks

- `GET /api/tasks/list/:listId` - Get tasks from list
- `GET /api/tasks/:taskId` - Get specific task
- `POST /api/tasks/list/:listId` - Create task (EDITOR+)
- `PUT /api/tasks/:taskId` - Update task (EDITOR+)
- `DELETE /api/tasks/:taskId` - Delete task (ADMIN)

#### Spaces

- `GET /api/spaces/workspace/:workspaceId` - Get workspace spaces
- `GET /api/spaces/:spaceId` - Get specific space
- `POST /api/spaces/workspace/:workspaceId` - Create space (EDITOR+)
- `PUT /api/spaces/:spaceId` - Update space (EDITOR+)
- `DELETE /api/spaces/:spaceId` - Delete space (ADMIN)

#### Lists

- `GET /api/lists/space/:spaceId` - Get space lists
- `GET /api/lists/folder/:folderId` - Get lists in folder
- `GET /api/lists/:listId` - Get specific list
- `POST /api/lists/space/:spaceId` - Create list in space (EDITOR+)
- `POST /api/lists/folder/:folderId` - Create list in folder (EDITOR+)
- `PUT /api/lists/:listId` - Update list (EDITOR+)
- `DELETE /api/lists/:listId` - Delete list (ADMIN)

#### Users & Workspaces

- `GET /api/users/workspaces` - Get authorized workspaces
- `GET /api/users/me` - Get current user info
- `GET /api/users/workspace/:workspaceId/members` - Get workspace members
- `POST /api/users/workspace/:workspaceId/invite` - Invite user (ADMIN)
- `DELETE /api/users/workspace/:workspaceId/user/:userId` - Remove user (ADMIN)
- `PUT /api/users/workspace/:workspaceId/user/:userId/role` - Update role (ADMIN)

### Role Permissions

| Role       | Read | Create/Update | Delete | User Management |
| ---------- | ---- | ------------- | ------ | --------------- |
| **VIEWER** | ✅   | ❌            | ❌     | ❌              |
| **EDITOR** | ✅   | ✅            | ❌     | ❌              |
| **ADMIN**  | ✅   | ✅            | ✅     | ✅              |

## 🧪 Testing

### API Testing Examples

```bash
# Register new user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","role":"EDITOR"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Get profile (with JWT)
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create task (with JWT)
curl -X POST http://localhost:3000/api/tasks/list/YOUR_LIST_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Task","description":"Created via API"}'

# Test rate limiting
for i in {1..15}; do
  curl -X GET http://localhost:3000/health
done
```

### Running Tests

```bash
npm run test           # Unit tests
npm run test:e2e       # End-to-end tests
npm run test:cov       # Coverage report
```

## 📦 Development Commands

### Application

```bash
npm run start          # Start in development mode
npm run start:dev      # Development with hot reload
npm run start:debug    # Debug mode
npm run build          # Build for production
npm run start:prod     # Run production build
npm run lint           # Run ESLint
npm run format         # Format with Prettier
```

### Database

```bash
npm run db:seed              # Seed default users
npx prisma migrate dev       # Run migrations
npx prisma generate          # Generate Prisma client
npx prisma studio            # Open database GUI
npx prisma migrate reset     # Reset database (dev only)
npx prisma db push           # Push schema changes without migration
npx prisma db pull           # Pull schema from existing database
npx prisma format            # Format Prisma schema file
```

## 🚀 Production Deployment

### Production Checklist

- [ ] **Environment Variables**: Set all required production values
- [ ] **JWT Secret**: Use cryptographically secure secret (32+ chars)
- [ ] **HTTPS/SSL**: Configure TLS certificates
- [ ] **CORS**: Set proper allowed origins
- [ ] **Database**: Use connection pooling and secure credentials
- [ ] **Rate Limiting**: Adjust limits for production load
- [ ] **Monitoring**: Set up logging aggregation (ELK, Datadog)
- [ ] **Backups**: Configure automated database backups
- [ ] **Security**: Enable firewall and network security groups

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

```bash
docker build -t clickup-api .
docker run -p 3000:3000 --env-file .env clickup-api
```

## 🚨 Troubleshooting

### Common Issues & Solutions

| Issue                          | Solution                                                            |
| ------------------------------ | ------------------------------------------------------------------- |
| **Database Connection Failed** | Verify DATABASE_URL credentials and PostgreSQL is running           |
| **JWT Authentication Error**   | Ensure JWT_SECRET is set (min 32 chars) and token format is correct |
| **Rate Limit Exceeded**        | Wait for reset or adjust THROTTLE\_\* settings                      |
| **ClickUp API Error**          | Verify CLICKUP_API_TOKEN is valid and has proper permissions        |
| **CORS Issues**                | Configure allowed origins in production                             |
| **Prisma Client Error**        | Run `npx prisma generate` after schema changes                      |

### Debug Mode

```bash
# Enable debug logging
NODE_ENV=development npm run start:dev

# Monitor logs
tail -f logs/combined.log

# Check error logs only
tail -f logs/error.log

# Decode JWT tokens
# Use https://jwt.io for token debugging
```

## 📊 Database Schema

```prisma
model User {
  id           Int       @id @default(autoincrement())
  email        String    @unique
  passwordHash String
  role         UserRole  @default(VIEWER)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  apiLogs      ApiLog[]
}

model ApiLog {
  id         Int      @id @default(autoincrement())
  userId     Int
  endpoint   String
  method     String
  timestamp  DateTime @default(now())
  statusCode Int
  user       User     @relation(fields: [userId], references: [id])
}

enum UserRole {
  ADMIN
  EDITOR
  VIEWER
}
```

## 🛡️ Security Best Practices

### Password Requirements

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (!@#$%^&\*)

### JWT Token Management

- Tokens expire after configured time (default: 1 day)
- Include in Authorization header: `Bearer <token>`
- Never expose tokens in URLs or logs
- Rotate JWT secrets regularly in production

### API Security

- All ClickUp endpoints require authentication
- Rate limiting prevents abuse
- Input validation on all endpoints
- Sensitive data redacted from logs
- CORS configured for production domains

## 💡 Advanced Features & Next Steps

### Ready to Implement

- 🔄 **WebSocket Integration**: Real-time updates with Socket.io
- 📱 **OAuth2/SAML**: Enterprise SSO integration
- 🔍 **Advanced Search**: Elasticsearch integration
- 📧 **Notifications**: Email/SMS with queuing
- 📊 **Analytics Dashboard**: Business intelligence features
- 🌐 **Multi-tenancy**: Organization-level isolation
- 🔒 **2FA**: Two-factor authentication
- 📈 **Metrics**: Prometheus/Grafana monitoring

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style (ESLint + Prettier)
- Add tests for new features
- Update API documentation (Swagger)
- Ensure security best practices
- Test with all user roles

## 📄 License

This project is licensed under the MIT License. Please ensure compliance with ClickUp's API terms of service when using in production.

## 🎯 Project Status

✅ **PRODUCTION-READY** - Enterprise-grade security implementation complete

### Implementation Status

- [x] JWT Authentication with RBAC
- [x] Multi-tier rate limiting (short/medium/long-term)
- [x] Database integration with audit logging
- [x] Comprehensive input validation
- [x] Structured logging with Winston
- [x] Complete Swagger API documentation
- [x] Production security hardening
- [x] Default user seeding

### Security Implementation Complete

- [x] Global JWT authentication guard
- [x] Public route exceptions
- [x] Role-based authorization
- [x] Password hashing with bcrypt
- [x] API request logging middleware
- [x] Sensitive data redaction in logs
- [x] Environment variable validation

---

**Built with ❤️ using NestJS, Prisma, PostgreSQL, and JWT Authentication**

🛡️ **Secure by Design** • 🚀 **Production Ready** • 📚 **Well Documented**
| `THROTTLE_LIMIT` | Rate limit max requests | `10` | ❌ |

### Security Configuration

#### JWT Configuration

```env
JWT_SECRET=your_very_secure_jwt_secret_change_this_in_production_min_32_chars
JWT_EXPIRES_IN=1d  # Options: 1h, 1d, 7d, 30d
```

#### Database Configuration

```env
DATABASE_URL="postgresql://username:password@localhost:5432/clickup_api?schema=public"
```

#### Rate Limiting Configuration

```env
THROTTLE_TTL=60000    # 1 minute
THROTTLE_LIMIT=10     # 10 requests per minute
```

## 🛡️ Error Handling & Security

### HTTP Status Codes

| Code    | Description                              | Security Implication        |
| ------- | ---------------------------------------- | --------------------------- |
| **400** | Bad Request - Invalid input data         | Input validation protection |
| **401** | Unauthorized - Invalid/missing JWT token | Authentication required     |
| **403** | Forbidden - Insufficient permissions     | Role-based access control   |
| **404** | Not Found - Resource doesn't exist       | Resource protection         |
| **429** | Too Many Requests - Rate limit exceeded  | DDoS protection             |
| **500** | Internal Server Error - Server issues    | Error logging enabled       |

### Security Error Responses

#### Authentication Errors

```json
{
  "statusCode": 401,
  "message": "Unauthorized - Invalid JWT token",
  "timestamp": "2025-09-24T13:03:27.314Z",
  "path": "/api/users/workspaces"
}
```

#### Rate Limiting Errors

```json
{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests",
  "timestamp": "2025-09-24T13:03:27.314Z"
}
```

#### Validation Errors

```json
{
  "statusCode": 400,
  "message": [
    "email must be a valid email",
    "password must be longer than or equal to 8 characters"
  ],
  "error": "Bad Request"
}
```

### Logging & Monitoring

All security events are logged with structured data:

- Authentication attempts (success/failure)
- Authorization violations
- Rate limiting triggers
- Input validation failures
- Database connection issues

## 📦 Available Scripts

### Application Scripts

```bash
npm run start         # Start in development mode
npm run start:dev     # Start with file watching and hot reload
npm run start:prod    # Start in production mode
npm run build         # Build the application
npm run test          # Run unit tests
npm run test:e2e      # Run end-to-end tests
npm run test:cov      # Run tests with coverage
npm run lint          # Run ESLint with auto-fix
npm run format        # Format code with Prettier
```

### Database Scripts

```bash
npm run db:seed       # Seed database with default users
npx prisma migrate dev         # Run database migrations
npx prisma generate           # Generate Prisma client
npx prisma studio            # Open Prisma Studio (database GUI)
npx prisma migrate reset     # Reset database (development only)
```

### Development Tools

```bash
npx prisma db push           # Push schema changes without migration
npx prisma db pull           # Pull schema from existing database
npx prisma format           # Format Prisma schema file
```

## 🚨 Troubleshooting

### Common Issues

#### Database Connection Issues

```bash
# Error: "Authentication failed against database server"
# Solution: Update DATABASE_URL in .env with valid PostgreSQL credentials
DATABASE_URL="postgresql://real_username:real_password@localhost:5432/clickup_api"
```

#### JWT Authentication Issues

```bash
# Error: "Unauthorized - Invalid JWT token"
# Solution 1: Ensure JWT_SECRET is set and at least 32 characters
JWT_SECRET=your_very_secure_jwt_secret_change_this_in_production_min_32_chars

# Solution 2: Check if token is properly included in Authorization header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Rate Limiting Issues

```bash
# Error: "Too Many Requests"
# Solution: Wait for rate limit reset or adjust THROTTLE_* settings
THROTTLE_TTL=60000     # Time window in milliseconds
THROTTLE_LIMIT=10      # Max requests per window
```

#### ClickUp API Issues

```bash
# Error: "Invalid ClickUp API token"
# Solution: Get fresh token from ClickUp Settings → Apps → API Token
CLICKUP_API_TOKEN=pk_your_fresh_api_token_here
```

### Development Tips

- **Hot Reload**: Changes are reflected immediately during development
- **Logging**: Check console logs for detailed error information
- **Swagger UI**: Use http://localhost:3000/api/docs for API testing
- **Database GUI**: Use `npx prisma studio` for visual database management
- **JWT Debugging**: Use https://jwt.io to decode and verify JWT tokens

### Production Deployment

1. **Environment Setup**

   ```bash
   NODE_ENV=production
   DATABASE_URL=postgresql://prod_user:prod_pass@prod_host:5432/prod_db
   JWT_SECRET=very_secure_production_secret_minimum_32_characters
   ```

2. **Database Setup**

   ```bash
   npx prisma migrate deploy  # Run migrations in production
   npm run db:seed            # Seed initial data
   ```

3. **Security Checklist**
   - [ ] Change all default passwords
   - [ ] Use strong JWT secrets
   - [ ] Configure proper CORS origins
   - [ ] Set up HTTPS/SSL
   - [ ] Configure rate limiting for production load
   - [ ] Set up log aggregation and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📚 Documentation & Resources

### External Resources

- [ClickUp API Documentation](https://developer.clickup.com/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [JWT.io](https://jwt.io/) - JWT token debugging
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 💡 What You Can Build With This

This **enterprise-grade security platform** enables you to:

### 🏢 Enterprise Applications

- **Secure API Gateways**: Production-ready API wrapper for ClickUp
- **Multi-tenant SaaS**: Role-based access for multiple organizations
- **Compliance Systems**: Audit trails and security logging for regulations
- **Identity Management**: User authentication and authorization systems

### 🔒 Security-First Solutions

- **Zero-Trust APIs**: JWT-based authentication with role verification
- **Rate-Limited Services**: DDoS protection with configurable limits
- **Audit Systems**: Complete API request logging and monitoring
- **Secure Integrations**: Protected connections to third-party services

### 📊 Business Applications

- **Custom Dashboards**: Secure data visualization platforms
- **Workflow Automation**: Protected automation with proper authorization
- **Team Management**: Role-based team collaboration tools
- **Reporting Systems**: Secure analytics with access controls

## 🚀 Next Steps & Advanced Features

### Ready-to-Implement Enhancements

- 🔄 **Real-time Updates**: WebSocket integration with JWT authentication
- 📱 **Mobile Backend**: OAuth2/SAML for enterprise authentication
- � **Containerization**: Docker deployment with security best practices
- � **CI/CD Pipeline**: Automated testing and secure deployments
- 📧 **Notification System**: Secure email/SMS notifications
- � **Webhook Handling**: Secure webhook processing with validation
- 📊 **Advanced Analytics**: Enhanced monitoring and business intelligence
- 🌐 **Multi-tenancy**: Organization-level data isolation

### Security Enhancements

- � **OAuth2/SAML**: Enterprise identity provider integration
- 🛡️ **API Versioning**: Backward-compatible API evolution
- � **Security Scanning**: Automated vulnerability assessment
- � **Compliance Logging**: SOC2/HIPAA compliance features
- � **Intrusion Detection**: Advanced security monitoring
- 🔒 **Data Encryption**: End-to-end encryption for sensitive data

## 📝 License

This project is for educational and demonstration purposes. Please ensure compliance with ClickUp's API terms of service when using this code in production environments.

## 🎯 Project Status

✅ **PRODUCTION-READY** - Enterprise-grade security implementation complete

### Security Implementation Status

- [x] JWT Authentication with role-based access control
- [x] Rate limiting and DDoS protection
- [x] Database integration with audit logging
- [x] Input validation and security hardening
- [x] Structured logging and monitoring
- [x] Environment security and configuration management
- [x] Complete API documentation with security schemas

### Ready for Production Deployment

This application implements enterprise-grade security features and is ready for production use with proper environment configuration and database setup.

---

**🛡️ Secure by Design • 🚀 Production Ready • 📚 Well Documented**

Built with ❤️ using **NestJS**, **Prisma**, **PostgreSQL**, and **JWT Authentication**

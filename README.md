# ClickUp API Enterprise-Grade NestJS Integration

A secure, production-ready NestJS application that provides an enterprise-grade REST API interface for the ClickUp API with comprehensive security features including JWT authentication, role-based authorization, rate limiting, and database integration.

## 🚀 Project Overview

This is a **complete enterprise-grade backend application** featuring:

1. **Secure NestJS Backend**: Production-ready REST API wrapper for ClickUp API with enterprise security
2. **Authentication & Authorization**: JWT-based authentication with role-based access control
3. **Database Integration**: PostgreSQL with Prisma ORM for user management and audit logging
4. **Security Hardening**: Rate limiting, input validation, structured logging, and environment security
5. **API Documentation**: Comprehensive Swagger documentation with security schemas

## 🛡️ Security Features

This application implements **enterprise-grade security** with:

### 🔐 Authentication & Authorization

- **JWT Authentication**: Secure token-based authentication system
- **Role-Based Access Control (RBAC)**: Admin, Editor, and Viewer roles
- **Password Security**: bcrypt hashing with proper salt rounds
- **Token Management**: Configurable JWT expiration and refresh

### 🚨 Security Hardening

- **Rate Limiting**: Multi-tier protection (10 requests/minute, 100/hour, 1000/day)
- **Input Validation**: Comprehensive DTO validation with class-validator
- **Environment Security**: Secure configuration management
- **CORS Protection**: Configured for production deployment
- **Security Headers**: HTTP security headers enabled

### 📊 Monitoring & Logging

- **Structured Logging**: Winston-based logging with multiple levels
- **API Audit Trail**: Database logging of all API requests
- **Error Tracking**: Comprehensive error handling and reporting
- **Performance Monitoring**: Request timing and performance metrics

### � Database Integration

- **PostgreSQL**: Production-grade database with Prisma ORM
- **User Management**: Complete user lifecycle management
- **Audit Logging**: Comprehensive API request logging
- **Database Security**: Connection security and query protection

## ✨ Features

### Core API Features

- 🔐 **Secure ClickUp Integration**: Protected API wrapper with authentication
- 📊 **Full CRUD Operations**: Complete management for Tasks, Spaces, Lists, and Users
- 🎯 **Input Validation**: Comprehensive DTOs with class-validator
- 📚 **Interactive Documentation**: Swagger UI with JWT authentication at `/api/docs`
- 🚨 **Production Logging**: Structured logging with Winston
- 🧪 **TypeScript**: Full type safety with strict mode enabled

### Authentication Features

- 🔑 **JWT Authentication**: Secure login/logout with token management
- 👥 **User Registration**: Secure user account creation
- �️ **Role Management**: Admin, Editor, Viewer access levels
- � **Protected Routes**: Route-level security with guards
- � **User Profile**: Complete profile management

## 🛠️ Technology Stack

### Core Framework

- **Framework**: NestJS v11 with TypeScript
- **Database**: PostgreSQL with Prisma ORM v6.16.2
- **Authentication**: JWT (@nestjs/jwt, @nestjs/passport)
- **Validation**: class-validator with comprehensive DTOs
- **Documentation**: Swagger/OpenAPI with security schemas

### Security & Monitoring

- **Rate Limiting**: @nestjs/throttler for DDoS protection
- **Password Security**: bcryptjs for secure password hashing
- **Logging**: Winston for structured, production-ready logging
- **HTTP Client**: Axios with security configurations
- **Environment**: @nestjs/config for secure configuration management

### Development Tools

- **TypeScript**: Strict mode enabled for maximum type safety
- **ESLint**: Code quality and security linting
- **Prettier**: Consistent code formatting
- **Hot Reload**: Development with instant reload
- **Testing**: Jest with e2e testing capabilities

## 📁 Project Structure

```
clickup-nestjs-api/
├── src/                          # Application source code
│   ├── auth/                     # 🔐 Authentication module
│   │   ├── auth.controller.ts    # Login/register endpoints
│   │   ├── auth.service.ts       # JWT authentication logic
│   │   ├── jwt.strategy.ts       # Passport JWT strategy
│   │   ├── guards/               # Authentication guards
│   │   └── dto/                  # Auth DTOs (login, register)
│   ├── users/                    # 👥 User management module
│   │   ├── users.controller.ts   # User management endpoints
│   │   ├── users.service.ts      # User business logic
│   │   └── dto/                  # User DTOs
│   ├── prisma/                   # 💾 Database module
│   │   ├── prisma.service.ts     # Database service
│   │   └── prisma.module.ts      # Database module configuration
│   ├── clickup/                  # 🎯 ClickUp integration modules
│   │   ├── auth/                 # ClickUp authentication
│   │   ├── tasks/                # Tasks management
│   │   ├── spaces/               # Spaces management
│   │   ├── lists/                # Lists management
│   │   ├── users/                # ClickUp users management
│   │   └── common/               # Shared DTOs and services
│   ├── common/                   # 🔧 Shared utilities
│   │   ├── middleware/           # API logging middleware
│   │   ├── guards/               # Global security guards
│   │   └── decorators/           # Custom decorators
│   ├── app.module.ts             # Main application module
│   └── main.ts                   # Application entry point
├── prisma/                       # 🗄️ Database configuration
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Database migrations
│   └── seed.ts                   # Database seeding script
├── docs/                         # 📚 Documentation
│   ├── README-SECURITY.md        # Security documentation
│   ├── IMPLEMENTATION-SUMMARY.md # Implementation guide
│   └── DEFAULT-CREDENTIALS.md    # Default user accounts
├── .env                          # Environment variables
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🏁 Getting Started

### Prerequisites

- **Node.js** (version >= 20)
- **PostgreSQL** (version >= 12)
- **npm** or yarn package manager
- **ClickUp account** with API access

### Installation

1. **Clone and install dependencies**

   ```bash
   git clone <repository-url>
   cd clickup-nestjs-api
   npm install
   ```

2. **Database Setup**

   ```bash
   # Create PostgreSQL database
   createdb clickup_api

   # Run database migrations
   npx prisma migrate dev --name init

   # Seed default users (optional)
   npm run db:seed
   ```

3. **Configure environment variables**

   Update the `.env` file with your credentials:

   ```properties
   # ClickUp API Configuration
   CLICKUP_API_TOKEN=pk_your_personal_api_token_here
   CLICKUP_API_BASE_URL=https://api.clickup.com/api/v2

   # Application Configuration
   PORT=3000
   NODE_ENV=development

   # Database Configuration (REQUIRED)
   DATABASE_URL="postgresql://username:password@localhost:5432/clickup_api?schema=public"

   # Security Configuration (REQUIRED)
   JWT_SECRET=your_very_secure_jwt_secret_change_this_in_production_min_32_chars
   JWT_EXPIRES_IN=1d

   # Rate Limiting Configuration
   THROTTLE_TTL=60000
   THROTTLE_LIMIT=10
   ```

   **🚨 Security Note**: All credentials must be changed for production use!

### 🔑 Default Test Accounts

The application includes pre-seeded test accounts:

| Role       | Email                    | Password     | Access Level         |
| ---------- | ------------------------ | ------------ | -------------------- |
| **ADMIN**  | `admin@clickup-api.com`  | `Admin123!`  | Full system access   |
| **EDITOR** | `editor@clickup-api.com` | `Editor123!` | Create, read, update |
| **VIEWER** | `viewer@clickup-api.com` | `Viewer123!` | Read-only access     |

### Getting Your ClickUp API Token

1. Log in to your ClickUp account
2. Go to Settings → Apps
3. Click "Generate" under API Token
4. Copy the token (starts with `pk_`) and update your `.env` file

### Running the Application

#### Development Mode

```bash
# Start the application with hot reload
npm run start:dev
```

**Available endpoints:**

- 🚀 **Application**: http://localhost:3000
- 📚 **API Documentation**: http://localhost:3000/api/docs
- 🔐 **Authentication**: POST /auth/login

#### Production Mode

```bash
# Build and start production server
npm run build
npm run start:prod
```

### 🔐 Authentication Quick Start

1. **Login to get JWT token:**

   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@clickup-api.com","password":"Admin123!"}'
   ```

2. **Use token in subsequent requests:**

   ```bash
   curl -X GET http://localhost:3000/api/users/workspaces \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

3. **Or use Swagger UI:**
   - Open http://localhost:3000/api/docs
   - Click "Authorize" button
   - Enter: `Bearer YOUR_JWT_TOKEN`

## 📚 API Documentation

### Interactive Documentation

Visit **http://localhost:3000/api/docs** for the complete Swagger documentation with JWT authentication support.

### Authentication Endpoints

#### 🔐 Authentication & User Management

- `POST /auth/login` - Authenticate user and receive JWT token
- `POST /auth/register` - Register new user account
- `POST /auth/profile` - Get current user profile (requires JWT)

### ClickUp Integration Endpoints

#### 📝 Tasks (🔒 JWT Required)

- `GET /api/tasks/list/:listId` - Get tasks from a specific list
- `GET /api/tasks/:taskId` - Get a specific task by ID
- `POST /api/tasks/list/:listId` - Create a new task in a list
- `PUT /api/tasks/:taskId` - Update an existing task
- `DELETE /api/tasks/:taskId` - Delete a task

#### 🏠 Spaces (🔒 JWT Required)

- `GET /api/spaces/workspace/:workspaceId` - Get spaces in a workspace
- `GET /api/spaces/:spaceId` - Get a specific space by ID
- `POST /api/spaces/workspace/:workspaceId` - Create a new space
- `PUT /api/spaces/:spaceId` - Update a space
- `DELETE /api/spaces/:spaceId` - Delete a space

#### 📋 Lists (🔒 JWT Required)

- `GET /api/lists/space/:spaceId` - Get lists in a space
- `GET /api/lists/folder/:folderId` - Get lists in a folder
- `GET /api/lists/:listId` - Get a specific list by ID
- `POST /api/lists/space/:spaceId` - Create a list in a space (folderless)
- `POST /api/lists/folder/:folderId` - Create a list in a folder
- `PUT /api/lists/:listId` - Update a list
- `DELETE /api/lists/:listId` - Delete a list

#### 👥 Users & Workspaces (🔒 JWT Required)

- `GET /api/users/workspaces` - Get authorized workspaces
- `GET /api/users/me` - Get current user info
- `GET /api/users/workspace/:workspaceId/members` - Get workspace members
- `POST /api/users/workspace/:workspaceId/invite` - Invite user to workspace
- `DELETE /api/users/workspace/:workspaceId/user/:userId` - Remove user from workspace
- `PUT /api/users/workspace/:workspaceId/user/:userId/role` - Update user role

### Role-Based Access Control

| Endpoint           | ADMIN | EDITOR | VIEWER |
| ------------------ | ----- | ------ | ------ |
| GET endpoints      | ✅    | ✅     | ✅     |
| POST/PUT endpoints | ✅    | ✅     | ❌     |
| DELETE endpoints   | ✅    | ❌     | ❌     |
| User management    | ✅    | ❌     | ❌     |

## 🛡️ Security Implementation

### Authentication Flow

1. **User Registration/Login**

   ```bash
   POST /auth/login
   {
     "email": "admin@clickup-api.com",
     "password": "Admin123!"
   }
   ```

2. **Receive JWT Token**

   ```json
   {
     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": {
       "id": 1,
       "email": "admin@clickup-api.com",
       "role": "ADMIN"
     }
   }
   ```

3. **Use Token for Protected Routes**
   ```bash
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Rate Limiting

The application implements multi-tier rate limiting:

- **Short-term**: 10 requests per minute
- **Medium-term**: 100 requests per hour
- **Long-term**: 1000 requests per day

### Security Features

#### 🔒 Data Protection

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Comprehensive DTO validation
- **SQL Injection Protection**: Prisma ORM query protection

#### 🚨 Monitoring & Logging

- **API Audit Trail**: All requests logged to database
- **Structured Logging**: Winston with multiple log levels
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Request timing and monitoring

#### �️ Production Security

- **Environment Variables**: Secure configuration management
- **CORS Configuration**: Proper cross-origin resource sharing
- **Security Headers**: HTTP security headers enabled
- **Database Security**: Connection pooling and query optimization

## 🧪 Testing the API

### Authentication Testing

1. **Login with Default Admin Account**

   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@clickup-api.com","password":"Admin123!"}'
   ```

2. **Register New User**
   ```bash
   curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "newuser@example.com",
       "password": "SecurePass123!",
       "role": "EDITOR"
     }'
   ```

### Protected Endpoints Testing

**Note**: Replace `YOUR_JWT_TOKEN` with the token from login response.

1. **Get Your Workspaces (Protected)**

   ```bash
   curl -X GET http://localhost:3000/api/users/workspaces \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

2. **Get User Profile (Protected)**

   ```bash
   curl -X GET http://localhost:3000/auth/profile \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

3. **Create a New Task (Protected)**
   ```bash
   curl -X POST http://localhost:3000/api/tasks/list/YOUR_LIST_ID \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Secure Task from API",
       "description": "This task was created using JWT authentication"
     }'
   ```

### Rate Limiting Testing

Test the rate limiting by making rapid requests:

```bash
# This should be blocked after 10 requests per minute
for i in {1..15}; do
  curl -X GET http://localhost:3000/api/users/workspaces \
    -H "Authorization: Bearer YOUR_JWT_TOKEN"
done
```

## 🔧 Configuration

### Environment Variables

| Variable               | Description                       | Default                          | Required |
| ---------------------- | --------------------------------- | -------------------------------- | -------- |
| `CLICKUP_API_TOKEN`    | Your ClickUp personal API token   | -                                | ✅       |
| `CLICKUP_API_BASE_URL` | ClickUp API base URL              | `https://api.clickup.com/api/v2` | ✅       |
| `DATABASE_URL`         | PostgreSQL connection string      | -                                | ✅       |
| `JWT_SECRET`           | JWT signing secret (min 32 chars) | -                                | ✅       |
| `JWT_EXPIRES_IN`       | JWT token expiration time         | `1d`                             | ❌       |
| `PORT`                 | Application server port           | `3000`                           | ❌       |
| `NODE_ENV`             | Environment mode                  | `development`                    | ❌       |
| `THROTTLE_TTL`         | Rate limit time window (ms)       | `60000`                          | ❌       |
| `THROTTLE_LIMIT`       | Rate limit max requests           | `10`                             | ❌       |

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

### Security Documentation

- 📋 [**README-SECURITY.md**](./README-SECURITY.md) - Comprehensive security guide
- 🔐 [**DEFAULT-CREDENTIALS.md**](./DEFAULT-CREDENTIALS.md) - Default test accounts
- 📖 [**IMPLEMENTATION-SUMMARY.md**](./IMPLEMENTATION-SUMMARY.md) - Implementation details

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

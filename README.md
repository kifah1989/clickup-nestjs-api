# ClickUp API Full-Stack Integration

A complete full-stack application that provides a REST API interface for the ClickUp API with a React frontend for data management.

## 🚀 Project Overview

This project consists of two main components:

1. **Backend (NestJS)**: Comprehensive REST API wrapper for ClickUp API with full CRUD operations
2. **Frontend (React)**: Interactive web interface for managing ClickUp data with intuitive navigation flow

### Navigation Flow
**Workspaces** → **Spaces** → **Lists** → **Tasks** → **Task Details**

## ✨ Features

### Backend Features
- 🔐 Authentication with ClickUp API using personal tokens
- 📊 CRUD operations for Tasks, Spaces, Lists, and Users
- 🎯 Proper DTOs and validation with class-validator
- 📚 Swagger documentation at `/api/docs`
- 🚨 Error handling and logging
- 🧪 TypeScript with strict mode enabled

### Frontend Features
- ⚛️ React with TypeScript for type safety
- 🎨 Tailwind CSS for modern, responsive design
- 🚀 React Router for seamless navigation
- 🔍 Search and filtering capabilities
- ✅ Full CRUD operations with forms and confirmations
- 📱 Responsive design for desktop and mobile
- 🎯 Intuitive breadcrumb navigation

## 🛠️ Technology Stack

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Development**: Hot reload with Nodemon

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React

## � Project Structure

```
clickup-api-playground/
├── src/                          # Backend source code
│   ├── clickup/                  # ClickUp integration module
│   ├── tasks/                    # Tasks module
│   ├── spaces/                   # Spaces module
│   ├── lists/                    # Lists module
│   ├── users/                    # Users module
│   ├── app.module.ts             # Main application module
│   └── main.ts                   # Application entry point
├── frontend/                     # React frontend application
│   ├── src/
│   │   ├── components/           # React components
│   │   │   └── Layout.tsx        # Main layout component
│   │   ├── pages/                # Page components
│   │   │   ├── WorkspacesPage.tsx
│   │   │   ├── SpacesPage.tsx
│   │   │   ├── ListsPage.tsx
│   │   │   ├── TasksPage.tsx
│   │   │   └── TaskDetailPage.tsx
│   │   ├── services/             # API service layer
│   │   │   └── api.ts
│   │   ├── App.tsx               # Main App component
│   │   └── main.tsx              # Application entry point
│   ├── public/                   # Static assets
│   ├── index.html                # HTML template
│   ├── package.json              # Frontend dependencies
│   ├── tailwind.config.js        # Tailwind configuration
│   ├── tsconfig.json             # TypeScript configuration
│   └── vite.config.ts            # Vite configuration
├── .env                          # Environment variables
├── package.json                  # Backend dependencies
├── tsconfig.json                 # Backend TypeScript configuration
└── README.md                     # This file
```

## 🏁 Getting Started

### Prerequisites
- Node.js (version >= 20)
- npm or yarn
- ClickUp account with API access

### Installation

1. **Install backend dependencies**
   ```bash
   npm install
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. **Configure environment variables**
   
   The `.env` file is already configured with a sample API token:
   ```properties
   # ClickUp API Configuration
   CLICKUP_API_TOKEN=pk_49058820_41BMMQ3F1JVUB7TUITDUHRMS3YBEIBTF
   CLICKUP_API_BASE_URL=https://api.clickup.com/api/v2

   # Application Configuration
   PORT=3000
   NODE_ENV=development
   ```

   **Note**: Replace the `CLICKUP_API_TOKEN` with your own ClickUp personal access token for production use.

### Getting Your ClickUp API Token

1. Log in to your ClickUp account
2. Go to Settings → Apps
3. Click "Generate" under API Token
4. Copy the token (starts with `pk_`) and update your `.env` file

### Running the Application

#### Development Mode

1. **Start the backend server**
   ```bash
   npm run start:dev
   ```
   Backend available at: http://localhost:3000
   Swagger documentation: http://localhost:3000/api/docs

2. **Start the frontend development server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend available at: http://localhost:5173

Both servers support hot reload for seamless development experience.

#### Production Mode

1. **Build both applications**
   ```bash
   # Build backend
   npm run build
   
   # Build frontend
   cd frontend
   npm run build
   cd ..
   ```

2. **Start the production server**
   ```bash
   npm run start:prod
   ```

## 📚 API Documentation

### Interactive Documentation
Visit http://localhost:3000/api/docs for the complete Swagger documentation with interactive API explorer.

### Available Endpoints

#### 📝 Tasks
- `GET /api/tasks/list/:listId` - Get tasks from a specific list
- `GET /api/tasks/:taskId` - Get a specific task by ID
- `POST /api/tasks/list/:listId` - Create a new task in a list
- `PUT /api/tasks/:taskId` - Update an existing task
- `DELETE /api/tasks/:taskId` - Delete a task

#### 🏠 Spaces
- `GET /api/spaces/workspace/:workspaceId` - Get spaces in a workspace
- `GET /api/spaces/:spaceId` - Get a specific space by ID
- `POST /api/spaces/workspace/:workspaceId` - Create a new space
- `PUT /api/spaces/:spaceId` - Update a space
- `DELETE /api/spaces/:spaceId` - Delete a space

#### 📋 Lists
- `GET /api/lists/space/:spaceId` - Get lists in a space
- `GET /api/lists/folder/:folderId` - Get lists in a folder
- `GET /api/lists/:listId` - Get a specific list by ID
- `POST /api/lists/space/:spaceId` - Create a list in a space (folderless)
- `POST /api/lists/folder/:folderId` - Create a list in a folder
- `PUT /api/lists/:listId` - Update a list
- `DELETE /api/lists/:listId` - Delete a list

#### 👥 Users & Workspaces
- `GET /api/users/workspaces` - Get authorized workspaces
- `GET /api/users/me` - Get current user info
- `GET /api/users/workspace/:workspaceId/members` - Get workspace members
- `POST /api/users/workspace/:workspaceId/invite` - Invite user to workspace
- `DELETE /api/users/workspace/:workspaceId/user/:userId` - Remove user from workspace
- `PUT /api/users/workspace/:workspaceId/user/:userId/role` - Update user role

## 🎯 Frontend Usage

### Navigation Flow

1. **Workspaces Page** (`/`) - View all available workspaces
   - Lists all workspaces you have access to
   - Click on a workspace to view its spaces

2. **Spaces Page** (`/workspace/:workspaceId/spaces`) - View spaces in a workspace
   - Create new spaces
   - Delete existing spaces
   - Navigate to lists in each space

3. **Lists Page** (`/workspace/:workspaceId/space/:spaceId/lists`) - View lists in a space
   - Create new lists
   - Delete existing lists
   - View task count for each list
   - Navigate to tasks in each list

4. **Tasks Page** (`/workspace/:workspaceId/space/:spaceId/list/:listId/tasks`) - View tasks in a list
   - Create new tasks with name and description
   - Delete existing tasks
   - View task status, priority, assignees, and due dates
   - Navigate to detailed task view

5. **Task Detail Page** (`/workspace/:workspaceId/space/:spaceId/list/:listId/task/:taskId`) - View and edit task details
   - Edit task name and description
   - View comprehensive task information
   - See assignees, dates, custom fields, and more
   - Open task in ClickUp

### Key Features

#### CRUD Operations
- ✅ **Create**: Add new spaces, lists, and tasks with intuitive forms
- ✅ **Read**: View all data with proper loading states and error handling
- ✅ **Update**: Edit task details with inline editing
- ✅ **Delete**: Remove items with confirmation dialogs for safety

#### User Experience
- 🔄 Loading states for all API operations
- ❌ Comprehensive error handling with retry options
- 📊 Breadcrumb navigation showing current location
- 🎨 Modern, responsive design that works on all devices
- 📱 Mobile-friendly interface with touch-optimized interactions
- 🌟 Clean, intuitive UI following modern design principles

## 🧪 Testing the API

### Quick Test Commands

1. **Get Your Workspaces**
   ```bash
   curl -X GET "http://localhost:3000/api/users/workspaces"
   ```

2. **Get Spaces in a Workspace**
   ```bash
   curl -X GET "http://localhost:3000/api/spaces/workspace/YOUR_WORKSPACE_ID"
   ```

3. **Create a New Task**
   ```bash
   curl -X POST "http://localhost:3000/api/tasks/list/YOUR_LIST_ID" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test Task from API",
       "description": "This task was created using the ClickUp API integration"
     }'
   ```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `CLICKUP_API_TOKEN` | Your ClickUp personal API token | Required |
| `CLICKUP_API_BASE_URL` | ClickUp API base URL | `https://api.clickup.com/api/v2` |
| `PORT` | Backend server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

## 🛡️ Error Handling

The application includes comprehensive error handling:

- **400 Bad Request**: Invalid input data or missing required fields
- **401 Unauthorized**: Invalid or missing ClickUp API token
- **404 Not Found**: Requested resource doesn't exist
- **500 Internal Server Error**: Server-side errors

Frontend error handling includes:
- User-friendly error messages
- Retry mechanisms for failed requests
- Loading states to prevent user confusion
- Fallback UI for when data cannot be loaded

## 📦 Available Scripts

### Backend Scripts
```bash
npm run start         # Start in development mode
npm run start:dev     # Start with file watching and hot reload
npm run start:prod    # Start in production mode
npm run build         # Build the application
npm run test          # Run unit tests
npm run test:e2e      # Run end-to-end tests
npm run test:cov      # Run tests with coverage
```

### Frontend Scripts
```bash
cd frontend
npm run dev           # Start development server with hot reload
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Issues**: The backend is configured to accept requests from the frontend origin
2. **API Token**: Ensure your ClickUp API token is valid and has necessary permissions
3. **Port Conflicts**: Make sure ports 3000 (backend) and 5173 (frontend) are available
4. **Build Issues**: Ensure TypeScript configurations don't conflict between backend and frontend

### Development Tips

- Both servers support hot reload, so changes are reflected immediately
- Use the browser's developer tools to debug frontend issues
- Check the backend logs for API-related issues
- The Swagger documentation at `/api/docs` is helpful for testing API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

##  Useful Links

- [ClickUp API Documentation](https://developer.clickup.com/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 💡 What You Can Build With This

This full-stack integration enables you to:

- **Custom Task Management**: Build tailored task management interfaces
- **Project Dashboards**: Create comprehensive project dashboards
- **Team Collaboration Tools**: Develop team-specific collaboration features
- **Reporting Systems**: Generate custom reports and analytics
- **Mobile Applications**: Use as backend for mobile apps
- **Automation Tools**: Automate workflows and task management
- **Integration Platforms**: Connect ClickUp with other business tools

## 🚀 Next Steps

Potential enhancements for the project:
- 🔐 Add user authentication and authorization
- 📊 Add data visualization and analytics dashboards
- 🔄 Real-time updates with WebSockets
- 📱 Mobile app with React Native
- 🧪 Add comprehensive testing suite
- 🐳 Docker containerization
- 🚀 CI/CD pipeline setup
- 📧 Email notifications
- 🔗 Webhook handling
- 🎨 Theme customization

## 📝 License

This project is for educational and demonstration purposes. Please ensure compliance with ClickUp's API terms of service when using this code.

---

**Happy coding! 🎉**

Built with ❤️ using NestJS and React
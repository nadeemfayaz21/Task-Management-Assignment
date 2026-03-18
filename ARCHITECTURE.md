# Architecture & Tech Stack

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         TASK MANAGEMENT APP                         │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                     FRONTEND (Browser)                               │
│                  Next.js 14 + React + TypeScript                    │
│                                                                      │
│    ┌──────────────────────────────────────────────────────────────┐ │
│    │ Pages (Next.js App Router)                                   │ │
│    │ • /login - Login page                                        │ │
│    │ • /register - Registration page                              │ │
│    │ • /dashboard - Task management dashboard                     │ │
│    └──────────────────────────────────────────────────────────────┘ │
│                           ↓                                          │
│    ┌──────────────────────────────────────────────────────────────┐ │
│    │ Components (React)                                           │ │
│    │ • Input - Text input fields                                  │ │
│    │ • Button - Action buttons                                    │ │
│    │ • Toast - Notification component                             │ │
│    │ • TaskItem - Individual task UI                              │ │
│    │ • TaskList - Task list with filters                          │ │
│    └──────────────────────────────────────────────────────────────┘ │
│                           ↓                                          │
│    ┌──────────────────────────────────────────────────────────────┐ │
│    │ State Management (Zustand)                                   │ │
│    │ • authStore - User & tokens                                  │ │
│    │ • taskStore - Tasks list & operations                        │ │
│    │ • Persistence layer for tokens                               │ │
│    └──────────────────────────────────────────────────────────────┘ │
│                           ↓                                          │
│    ┌──────────────────────────────────────────────────────────────┐ │
│    │ API Client (Axios)                                           │ │
│    │ • Auto token management                                      │ │
│    │ • Error handling                                             │ │
│    │ • Base URL configuration                                     │ │
│    └──────────────────────────────────────────────────────────────┘ │
│                                                                      │
│ HTTP/HTTPS (CORS Enabled)                                           │
└──────────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                     BACKEND API (Server)                             │
│              Node.js + Express + TypeScript                          │
│              Running on http://localhost:5000                        │
│                                                                      │
│    ┌──────────────────────────────────────────────────────────────┐ │
│    │ Routes (Express Router)                                      │ │
│    │ • /auth/* - Authentication endpoints                         │ │
│    │ • /tasks/* - Task CRUD endpoints                             │ │
│    │ • /health - Health check                                     │ │
│    └──────────────────────────────────────────────────────────────┘ │
│                    ↓                      ↓                          │
│    ┌────────────────────────┐  ┌─────────────────────────────────┐ │
│    │ Auth Routes            │  │ Task Routes                     │ │
│    │ /register              │  │ GET /tasks (paginated)          │ │
│    │ /login                 │  │ POST /tasks (create)            │ │
│    │ /refresh               │  │ GET /tasks/:id (read)           │ │
│    │ /logout                │  │ PATCH /tasks/:id (update)       │ │
│    │                        │  │ DELETE /tasks/:id (delete)      │ │
│    │                        │  │ POST /tasks/:id/toggle (status) │ │
│    └────────────────────────┘  └─────────────────────────────────┘ │
│             ↓                                    ↓                   │
│    ┌────────────────────────┐  ┌─────────────────────────────────┐ │
│    │ Auth Middleware        │  │ Auth Middleware                 │ │
│    │ (JWT Verification)     │  │ (Protects task routes)          │ │
│    └────────────────────────┘  └─────────────────────────────────┘ │
│             ↓                                    ↓                   │
│    ┌────────────────────────┐  ┌─────────────────────────────────┐ │
│    │ Auth Controller        │  │ Task Controller                 │ │
│    │ • register()           │  │ • getTasks()                    │ │
│    │ • login()              │  │ • createTask()                  │ │
│    │ • refresh()            │  │ • updateTask()                  │ │
│    │ • logout()             │  │ • deleteTask()                  │ │
│    │                        │  │ • toggleTaskStatus()            │ │
│    └────────────────────────┘  └─────────────────────────────────┘ │
│             ↓                                    ↓                   │
│    ┌────────────────────────┐  ┌─────────────────────────────────┐ │
│    │ Utilities              │  │ Prisma Client                   │ │
│    │ • jwt.ts               │  │ • User model queries            │ │
│    │ • password.ts          │  │ • Task model queries            │ │
│    │ • validation.ts        │  │ • Pagination logic              │ │
│    └────────────────────────┘  └─────────────────────────────────┘ │
│                                            ↓                        │
└──────────────────────────────────────────────────────────────────────┘
                                            ↓
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                     DATABASE (MySQL)                                 │
│                                                                      │
│    ┌──────────────────────────────────────────────────────────────┐ │
│    │ Users Table                                                  │ │
│    │ • id (INT, PRIMARY KEY)                                      │ │
│    │ • email (VARCHAR, UNIQUE)                                    │ │
│    │ • password (VARCHAR, HASHED)                                 │ │
│    │ • name (VARCHAR)                                             │ │
│    │ • createdAt, updatedAt (TIMESTAMP)                           │ │
│    └──────────────────────────────────────────────────────────────┘ │
│                                                                      │
│    ┌──────────────────────────────────────────────────────────────┐ │
│    │ Tasks Table                                                  │ │
│    │ • id (INT, PRIMARY KEY)                                      │ │
│    │ • title (VARCHAR)                                            │ │
│    │ • description (TEXT, NULLABLE)                               │ │
│    │ • status (VARCHAR: pending/completed)                        │ │
│    │ • userId (INT, FOREIGN KEY → Users)                          │ │
│    │ • createdAt, updatedAt (TIMESTAMP)                           │ │
│    └──────────────────────────────────────────────────────────────┘ │
│                                                                      │
│    Running on: localhost:3306                                       │
│    Database: task_manager                                           │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### 1. Registration Flow
```
User Input (Email, Password, Name)
         ↓
    Frontend Form
         ↓
    API Client (POST /auth/register)
         ↓
    Backend: authController.register()
         ↓
    Validate Input (Zod)
         ↓
    Check if Email Exists
         ↓
    Hash Password (bcryptjs)
         ↓
    Create User in Database (Prisma)
         ↓
    Generate Tokens (JWT)
         ↓
    Return User + Tokens
         ↓
    Store in Zustand + Local Storage
         ↓
    Redirect to Dashboard
```

### 2. Task Creation Flow
```
User Input (Title, Description)
         ↓
    Frontend Form
         ↓
    API Client (POST /tasks)
         ↓
    Add Auth Header (Bearer Token)
         ↓
    Backend: taskController.createTask()
         ↓
    Verify Token (JWT Middleware)
         ↓
    Validate Input (Zod)
         ↓
    Create Task in Database (Prisma)
         ↓
    Return Created Task
         ↓
    Add to Zustand Store
         ↓
    Display in UI + Toast Notification
```

### 3. Fetch Tasks Flow
```
Dashboard Page Load
         ↓
    Zustand Hook: useTaskStore()
         ↓
    API Client (GET /tasks?page=1&limit=10)
         ↓
    Add Auth Header (Bearer Token)
         ↓
    Backend: taskController.getTasks()
         ↓
    Verify Token (JWT Middleware)
         ↓
    Parse Filters (Status, Search)
         ↓
    Build Prisma Query with WHERE clause
         ↓
    Fetch from Database + Count Total
         ↓
    Return Tasks + Pagination Info
         ↓
    Update Zustand Store
         ↓
    Render Task List
```

## Technology Stack Details

### Frontend Stack
```
Next.js 14 (App Router)                    Framework
├── React 18                                UI Library
├── TypeScript                              Type Safety
├── Zustand                                 State Management
│   ├── authStore                           Auth State + Tokens
│   └── taskStore                           Task State
├── Axios                                   HTTP Client
├── Tailwind CSS                            Styling
└── React Hooks                             Component Logic
```

### Backend Stack
```
Node.js                                    Runtime
├── Express.js                             Web Framework
├── TypeScript                             Type Safety
├── Prisma ORM                             Database Access
│   └── MySQL Driver                       Database Connection
├── jsonwebtoken                           JWT Generation/Verification
├── bcryptjs                               Password Hashing
├── Zod                                    Input Validation
├── CORS                                   Cross-Origin Support
└── dotenv                                 Environment Variables
```

### Database Stack
```
MySQL                                      Database
├── Users Table                            Stores user credentials
├── Tasks Table                            Stores user tasks
└── Relationships                          userId foreign key
```

## Component Hierarchy

```
App (Root Layout)
├── Page (/)
│   └── Redirects to /login or /dashboard
├── (auth) Route Group
│   ├── Login (/login)
│   │   ├── Input (Email)
│   │   ├── Input (Password)
│   │   └── Button (Login)
│   └── Register (/register)
│       ├── Input (Name)
│       ├── Input (Email)
│       ├── Input (Password)
│       └── Button (Register)
└── Dashboard (/dashboard)
    ├── Navigation Bar
    │   ├── Title
    │   ├── User Info
    │   └── Button (Logout)
    └── TaskList
        ├── Button (Add Task)
        ├── Form (Create Task)
        │   ├── Input (Title)
        │   ├── TextArea (Description)
        │   └── Button (Create)
        ├── Filters
        │   ├── Input (Search)
        │   ├── Select (Status)
        │   └── Button (Apply)
        ├── TaskItem (List)
        │   ├── Checkbox (Toggle)
        │   ├── Title
        │   ├── Description
        │   ├── Date
        │   ├── Button (Edit)
        │   └── Button (Delete)
        └── Pagination
            └── Button (Page Numbers)
```

## State Management Flow

### Auth Store (Zustand)
```
Initial State
└── user: null
    accessToken: null
    refreshToken: null
    isLoading: false
    error: null

Actions
├── setUser() - Update user info
├── setTokens() - Store access+refresh tokens
├── login() - Authenticate user
├── register() - Create new account
├── refresh() - Get new access token
├── logout() - Clear all auth data
└── initializeAuth() - Restore from storage
```

### Task Store (Zustand)
```
Initial State
└── tasks: []
    pagination: { total, page, limit, pages }
    isLoading: false
    error: null

Actions
├── fetchTasks() - Get paginated tasks
├── createTask() - Create new task
├── updateTask() - Modify task
├── deleteTask() - Remove task
├── toggleTask() - Change status
└── setError() - Update error state
```

## API Communication Pattern

```
Frontend              Network              Backend
   │                    │                    │
   ├─ POST /auth/login ─────────────────→  │
   │                    │                    │
   │                    │  Validate & Hash   │
   │                    │  Generate Tokens   │
   │                    │                    │
   │  ← Tokens + User ──────────────────────│
   │                    │                    │
   │ Store in Zustand   │                    │
   │ Set Auth Header    │                    │
   │                    │                    │
   ├─ GET /tasks        │                    │
   │  Bearer Token ─────────────────────→  │
   │                    │                    │
   │                    │  Verify Token     │
   │                    │  Query Database    │
   │                    │                    │
   │  ← Tasks + Pagination ─────────────────│
   │                    │                    │
   │ Update Task Store  │                    │
   │ Render UI          │                    │
```

## Security Architecture

```
Frontend Security
├── Token Storage (Zustand + localStorage)
├── Auth Header Addition (Axios)
├── Protected Routes (Next.js Redirects)
└── Local Token Refresh

Backend Security
├── JWT Verification (Middleware)
├── Password Hashing (bcryptjs)
├── Input Validation (Zod)
├── User Isolation (userId queries)
├── CORS Configuration
└── Error Message Safety
```

## Deployment Architecture (Future)

```
Front End                Backend               Database
(Vercel/Netlify)    (Render/Heroku)      (AWS RDS/PlanetScale)
       │                   │                      │
       │                   │                      │
   Next.js             Express API            MySQL
   (Static)            (Node.js)             (Cloud)
   + CSR                                        │
       │                   │                    │
       └───────────────────┴────────────────────┘
              HTTPS Connection
```

---

This architecture supports:
✅ Scalability - Horizontal scaling via load balancing
✅ Maintainability - Clear separation of concerns
✅ Security - Multiple security layers
✅ Performance - Optimized queries and caching
✅ Reliability - Error handling at all levels

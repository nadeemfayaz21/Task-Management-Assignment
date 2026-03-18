# Task Manager Application 📋

A full-stack task management application built with **Node.js + Express** backend and **Next.js** frontend with JWT authentication, modern UI with Tailwind CSS, and MySQL database.

🌐 **Live Demo Features:**
- Secure JWT-based authentication
- Create, edit, delete, and complete tasks
- Search and filter tasks
- Pagination support
- Beautiful responsive UI with gradients and animations
- real-time validation
- Toast notifications

## Project Structure

```
Assignment/
├── backend/          # Node.js + Express + Prisma API
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utilities (JWT, passwords, validation)
│   │   └── index.ts       # Main server file
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/         # Next.js 14 + React + TypeScript
    ├── app/
    │   ├── (auth)/        # Authentication pages (login, register)
    │   ├── dashboard/     # Task dashboard
    │   └── page.tsx       # Home page redirect
    ├── components/        # Reusable components
    ├── lib/              # API client
    ├── store/            # Zustand stores (auth, tasks)
    ├── types/            # TypeScript types
    ├── package.json
    └── tsconfig.json
```

## Backend Setup

### Prerequisites
- Node.js (v18+)
- MySQL database
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and update the following:
```
DATABASE_URL="mysql://username:password@localhost:3306/task_manager"
JWT_SECRET="your-super-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"
PORT=5000
NODE_ENV="development"
```

4. Set up the database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Start the development server:
```bash
npm run dev
```

The API will be running at `http://localhost:5000`

### API Endpoints

#### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

#### Tasks (requires authentication)
- `GET /tasks` - Get tasks with pagination, filtering, and search
  - Query params: `page`, `limit`, `status` (pending/completed), `search`
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get a specific task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `POST /tasks/:id/toggle` - Toggle task status

## Frontend Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Application Features

#### Authentication
- User registration with email, password, and name
- Password hashing with bcryptjs
- JWT-based authentication (Access + Refresh tokens)
- Automatic token refresh on API calls
- Secure logout functionality

#### Task Management
- **CRUD Operations**: Create, Read, Update, Delete tasks
- **Task Status**: Toggle between pending and completed
- **Pagination**: Load tasks in batches of 10
- **Filtering**: Filter tasks by status (pending/completed)
- **Search**: Search tasks by title or description
- **Responsive Design**: Works on desktop and mobile devices

#### UI Components
- Login and Registration pages with form validation
- Task Dashboard with task list and creation form
- Task Item with inline editing
- Toast notifications for user feedback
- Responsive navigation bar

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: Zod
- **CORS**: cors package

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: React 18
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **CSS Preprocessor**: PostCSS

## Development Workflow

### 1. Start MySQL Database
```bash
# Using Docker (optional)
docker run --name task_manager_db -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=task_manager -p 3306:3306 -d mysql:latest
```

### 2. Start Backend
```bash
cd backend
npm run dev
```

### 3. Start Frontend (in another terminal)
```bash
cd frontend
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- API: http://localhost:5000
- API Health: http://localhost:5000/health

## Testing the Application

1. **Register**: Visit http://localhost:3000/register
2. **Create Account**: Fill in email, password, and name
3. **Login**: Credentials are auto-filled after registration
4. **Add Tasks**: Click "Add New Task" and fill in the form
5. **Manage Tasks**: 
   - Check/uncheck to toggle completion status
   - Edit to modify title/description
   - Delete to remove tasks
6. **Filter & Search**: Use the filters and search to find specific tasks
7. **Pagination**: Navigate through task pages

## Authentication Flow

1. User registers/logs in
2. Backend validates credentials and generates:
   - **Access Token** (15 minutes): Used for API requests
   - **Refresh Token** (7 days): Stored, used to get new access tokens
3. Frontend stores tokens in browser storage (Zustand)
4. API client automatically adds access token to request headers
5. When access token expires, frontend uses refresh token to get new one
6. On logout, both tokens are cleared

## Error Handling

The API returns standard HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (invalid/missing token)
- `404`: Not Found
- `500`: Server Error

Error responses include a descriptive `error` field.

## Deployment

### Backend (Render, Heroku, DigitalOcean, etc.)
1. Set up production environment variables
2. Create MySQL database on cloud provider
3. Deploy Node.js app
4. Run migrations: `npm run prisma:migrate`

### Frontend (Vercel, Netlify, etc.)
1. Set `NEXT_PUBLIC_API_URL` to production backend URL
2. Deploy Next.js app

## Additional Commands

### Backend
```bash
npm run build        # Build TypeScript
npm run start        # Run compiled JavaScript
npm run prisma:studio # Open Prisma Studio GUI
```

### Frontend
```bash
npm run build        # Build for production
npm run lint         # Run ESLint
```

## Security Considerations

- Passwords hashed with bcryptjs (12-round salt)
- JWT secrets stored in environment variables
- Access tokens have short expiration (15 minutes)
- Refresh tokens stored server-side capability (can be added)
- CORS enabled for API requests
- Input validation with Zod
- Protected routes require authentication

## License

MIT

## Support

For issues or questions, please check the code comments or create an issue in the repository.

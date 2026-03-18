# Quick Start Guide

## Prerequisites
- Node.js v18 or higher
- MySQL Server running locally
- npm or yarn package manager

## Backend Setup (5 minutes)

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up database (MySQL must be running):**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
   This creates the database schema automatically. If prompted to create database, type `yes`.

3. **Start the server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

## Frontend Setup (3 minutes)

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:3000`

## First Use

1. Open http://localhost:3000 in your browser
2. Click "Register" to create an account
3. Fill in email, password, and name
4. You'll be logged in automatically
5. Start creating and managing tasks!

## Quick Test

1. Add a task titled "Learn Task Manager"
2. Check the checkbox to mark it complete
3. Use filters to see only completed tasks
4. Edit the task description
5. Delete the task

## Troubleshooting

### "Cannot connect to database"
- Ensure MySQL is running
- Check DATABASE_URL in backend/.env matches your MySQL credentials
- Default: `mysql://root:password@localhost:3306/task_manager`

### "Port 5000 already in use"
- Change PORT in backend/.env to another port (e.g., 5001)
- Update NEXT_PUBLIC_API_URL in frontend/.env.local accordingly

### "Port 3000 already in use"
- Run on different port: `npm run dev -- -p 3001`

### "Prisma migration fails"
- Delete the prisma/migrations folder
- Run `npm run prisma:migrate` again

## API Testing

You can test the API using curl or Postman:

```bash
# Register
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456","name":"Test User"}'

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# Get tasks (replace TOKEN with access token from login)
curl -X GET http://localhost:5000/tasks \
  -H "Authorization: Bearer TOKEN"
```

## Project Structure Overview

```
backend/              - Express API with JWT auth
├── src/
│   ├── controllers/  - Business logic (auth, tasks)
│   ├── middleware/   - Auth middleware
│   ├── routes/       - API endpoints
│   └── utils/        - JWT, password, validation helpers
└── prisma/          - Database schema & migrations

frontend/             - Next.js web app
├── app/             - App Router pages
├── components/      - Reusable UI components
├── lib/             - API client
└── store/           - Zustand state management
```

## Next Steps

1. In production, change JWT_SECRET values to strong random strings
2. Add password reset functionality
3. Implement task categories/tags
4. Add due dates and priorities
5. Enable collaborative task management
6. Add email notifications

Enjoy managing your tasks! 🚀

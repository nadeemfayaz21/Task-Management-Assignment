# Installation & Deployment Checklist

## Pre-Installation Requirements

- [ ] Node.js v18+ installed
- [ ] MySQL Server installed and running
- [ ] npm or yarn installed
- [ ] Code editor (VS Code recommended)
- [ ] Git (optional, for version control)

## Backend Setup Checklist

### Step 1: Install Dependencies
- [ ] Navigate to `/backend` directory
- [ ] Run `npm install`
- [ ] All dependencies installed successfully
- [ ] No critical warnings in installation output

### Step 2: Database Setup
- [ ] MySQL Server running on localhost:3306
- [ ] Default credentials: root/password (update if different)
- [ ] Run `npm run prisma:generate`
- [ ] Run `npm run prisma:migrate`
- [ ] Database `task_manager` created successfully
- [ ] `users` and `tasks` tables exist

### Step 3: Environment Configuration
- [ ] `.env` file exists in `/backend`
- [ ] `DATABASE_URL` points to your MySQL instance
- [ ] `JWT_SECRET` is set (long random string for production)
- [ ] `JWT_REFRESH_SECRET` is set
- [ ] `PORT` is 5000 (or your preferred port)

### Step 4: Start Backend Server
- [ ] Run `npm run dev`
- [ ] See "Server running on http://localhost:5000" message
- [ ] No error messages in terminal
- [ ] API is responding at `http://localhost:5000/health`

### Backend Verification
- [ ] Test `/health` endpoint returns `{ "message": "Server is running" }`
- [ ] Check Prisma types generated in `node_modules/.prisma`
- [ ] Connection pool working (check database logs)

## Frontend Setup Checklist

### Step 1: Install Dependencies
- [ ] Navigate to `/frontend` directory
- [ ] Run `npm install`
- [ ] All dependencies installed successfully
- [ ] No critical warnings

### Step 2: Environment Configuration
- [ ] `.env.local` file exists in `/frontend`
- [ ] `NEXT_PUBLIC_API_URL` points to http://localhost:5000
- [ ] No typos in API URL

### Step 3: Start Frontend Server
- [ ] Run `npm run dev`
- [ ] See "ready - started server on 0.0.0.0:3000" message
- [ ] No error messages in terminal
- [ ] Frontend accessible at `http://localhost:3000`

### Frontend Verification
- [ ] App loads without errors in browser console
- [ ] No CORS errors in browser
- [ ] Redirects to login page automatically
- [ ] Static assets load (styles, fonts)

## Functional Testing Checklist

### Authentication Flow
- [ ] Visit http://localhost:3000
- [ ] Redirected to login page
- [ ] Navigate to registration
- [ ] Register with valid email, password (6+ chars), and name
- [ ] Successfully registered and logged in
- [ ] Redirected to dashboard
- [ ] Can log out successfully
- [ ] Redirected back to login
- [ ] Login with registered credentials works
- [ ] Login with wrong password fails with error

### Task Management
- [ ] Add new task with title only - Works
- [ ] Add task with title and description - Works
- [ ] See tasks displayed in list
- [ ] Edit task title and description - Updates correctly
- [ ] Delete task - Removes from list
- [ ] Toggle task status - Checkbox works
- [ ] Completed tasks show visual feedback (strikethrough)
- [ ] Filter by status - Shows only selected status
- [ ] Search by keyword - Finds matching tasks
- [ ] Pagination works - Can navigate pages
- [ ] Create 15+ tasks - Pagination shows multiple pages

### UI/UX
- [ ] No console errors in browser DevTools
- [ ] Responsive on mobile (test with browser zoom or phone)
- [ ] Responsive on tablet (test with browser DevTools device mode)
- [ ] Toast notifications appear on actions
- [ ] Toast notifications auto-dismiss after 3 seconds
- [ ] Loading indicators show during API calls
- [ ] Error messages display clearly
- [ ] Buttons are disabled during loading

### Performance
- [ ] Initial page load < 3 seconds
- [ ] Task list loads within 1 second
- [ ] API responses received in < 500ms
- [ ] No memory leaks (check DevTools Performance)
- [ ] No infinite loops in console

## API Testing Checklist

### Using curl or Postman
- [ ] POST /auth/register - Returns user and tokens
- [ ] POST /auth/login - Returns user and tokens
- [ ] GET /tasks with token - Returns paginated tasks
- [ ] POST /tasks - Creates task, returns with ID
- [ ] PATCH /tasks/:id - Updates task fields
- [ ] DELETE /tasks/:id - Deletes and confirms deletion
- [ ] POST /tasks/:id/toggle - Toggles status
- [ ] Invalid token returns 401 error
- [ ] Missing auth header returns 401 error

## Deployment Preparation Checklist

### Backend Pre-Deployment
- [ ] All environment variables properly set
- [ ] JWT secrets are strong (32+ character random strings)
- [ ] Database backups configured
- [ ] Error logging configured
- [ ] NODE_ENV set to "production"
- [ ] PORT configured for your platform
- [ ] Database connection pooling optimized
- [ ] CORS settings restricted to frontend domain

### Frontend Pre-Deployment
- [ ] NEXT_PUBLIC_API_URL points to production backend
- [ ] Production build successful: `npm run build`
- [ ] No console errors in production build
- [ ] Environment variables for production configured
- [ ] Analytics/tracking configured (optional)
- [ ] Meta tags and SEO configured

### Database Pre-Deployment
- [ ] Database users created with limited privileges
- [ ] Backups configured and tested
- [ ] Database monitoring enabled
- [ ] Connection limits set appropriately
- [ ] Indexes verified on frequently queried columns

## Troubleshooting Checklist

### Backend Won't Start
- [ ] MySQL is running: `mysql -u root -p password`
- [ ] Database URL is correct in .env
- [ ] PORT 5000 is not in use: Check `netstat -ano | findstr :5000`
- [ ] All npm dependencies installed: `npm install`
- [ ] Node version is v18+: `node --version`

### Frontend Won't Load
- [ ] Backend is running on correct port
- [ ] `NEXT_PUBLIC_API_URL` in .env.local is correct
- [ ] Clear browser cache: DevTools > Application > Clear storage
- [ ] Check CORS errors in browser console
- [ ] PORT 3000 is not in use

### Database Issues
- [ ] MySQL port is 3306 (check in .env)
- [ ] MySQL credentials are correct (root/password)
- [ ] Database `task_manager` exists: `show databases;`
- [ ] Tables exist: `use task_manager; show tables;`
- [ ] Prisma client generated: `npm run prisma:generate`

### API Errors (500 errors)
- [ ] Check backend terminal for error messages
- [ ] Verify database connection is active
- [ ] Check server logs for stack traces
- [ ] Ensure all environment variables are set
- [ ] Verify Prisma migrations have run

### Login/Auth Issues
- [ ] Clear browser storage: DevTools > Application > Storage
- [ ] Check that tokens are returned from /auth/login
- [ ] Verify JWT secrets are set in backend .env
- [ ] Check Authorization header format: "Bearer <token>"

## Performance Optimization Checklist

- [ ] Backend database indexes created
- [ ] API pagination working (limiting results)
- [ ] Frontend lazy loading components
- [ ] Images optimized (if any)
- [ ] API response times < 500ms
- [ ] Frontend bundle size optimized
- [ ] No unnecessary re-renders in React
- [ ] Database query optimization

## Security Checklist

- [ ] Passwords hashed with bcryptjs before storage
- [ ] JWT tokens have expiration times
- [ ] Environment variables contain secrets (not in code)
- [ ] CORS configured to allow only frontend domain
- [ ] Input validation on all API endpoints
- [ ] SQL injection protection via Prisma ORM
- [ ] No sensitive data in error messages
- [ ] HTTPS enabled in production
- [ ] Database user has limited permissions
- [ ] Regular security updates for dependencies

## Final Sign-Off

- [ ] All setup steps completed
- [ ] All functional tests passed
- [ ] API tests passed
- [ ] Responsive design verified
- [ ] Performance acceptable
- [ ] Security measures in place
- [ ] Documentation reviewed
- [ ] Ready for production deployment

---

## Quick Test Commands

```bash
# Backend health check
curl http://localhost:5000/health

# Register new user
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test123@example.com","password":"123456","name":"Test"}'

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test123@example.com","password":"123456"}'

# Get tasks (replace TOKEN with access token from login response)
curl -X GET http://localhost:5000/tasks \
  -H "Authorization: Bearer TOKEN"
```

## Support Notes

- Keep all `.env` files secure and never commit them
- Update dependencies monthly with `npm audit`
- Monitor database size and clean old data periodically
- Set up automated backups for production database
- Keep error logs for debugging
- Document any customizations made

---

Good luck with your deployment! 🚀

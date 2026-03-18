# API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "message": "Registration successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "message": "Token refreshed",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer <accessToken>
```

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

---

## Tasks (All endpoints require authentication)

All task endpoints require the `Authorization` header:
```http
Authorization: Bearer <accessToken>
```

### Get Tasks
```http
GET /tasks?page=1&limit=10&status=pending&search=shopping
Authorization: Bearer <accessToken>
```

**Query Parameters:**
- `page` (optional, default: 1) - Page number for pagination
- `limit` (optional, default: 10, max: 100) - Tasks per page
- `status` (optional) - Filter by status: `pending` or `completed`
- `search` (optional) - Search in title and description

**Response (200 OK):**
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "status": "pending",
      "userId": 1,
      "createdAt": "2024-03-18T10:30:00Z",
      "updatedAt": "2024-03-18T10:30:00Z"
    },
    {
      "id": 2,
      "title": "Finish project",
      "description": "Complete the task manager",
      "status": "completed",
      "userId": 1,
      "createdAt": "2024-03-17T14:20:00Z",
      "updatedAt": "2024-03-18T09:15:00Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

### Create Task
```http
POST /tasks
Content-Type: application/json
Authorization: Bearer <accessToken>

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending",
  "userId": 1,
  "createdAt": "2024-03-18T10:30:00Z",
  "updatedAt": "2024-03-18T10:30:00Z"
}
```

### Get Single Task
```http
GET /tasks/:id
Authorization: Bearer <accessToken>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending",
  "userId": 1,
  "createdAt": "2024-03-18T10:30:00Z",
  "updatedAt": "2024-03-18T10:30:00Z"
}
```

### Update Task
```http
PATCH /tasks/:id
Content-Type: application/json
Authorization: Bearer <accessToken>

{
  "title": "Buy groceries and cook",
  "description": "Milk, eggs, bread, and prepare dinner",
  "status": "completed"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Buy groceries and cook",
  "description": "Milk, eggs, bread, and prepare dinner",
  "status": "completed",
  "userId": 1,
  "createdAt": "2024-03-18T10:30:00Z",
  "updatedAt": "2024-03-18T11:45:00Z"
}
```

### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <accessToken>
```

**Response (200 OK):**
```json
{
  "message": "Task deleted successfully"
}
```

### Toggle Task Status
Toggles task between `pending` and `completed` states.

```http
POST /tasks/:id/toggle
Authorization: Bearer <accessToken>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "completed",
  "userId": 1,
  "createdAt": "2024-03-18T10:30:00Z",
  "updatedAt": "2024-03-18T10:31:00Z"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid email"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid or expired access token"
}
```

### 404 Not Found
```json
{
  "error": "Task not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200  | OK - Request successful |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid input or validation error |
| 401  | Unauthorized - Missing or invalid authentication token |
| 404  | Not Found - Resource does not exist |
| 500  | Internal Server Error - Server error occurred |

---

## Authentication Flow

1. **Register/Login**: Get `accessToken` and `refreshToken`
2. **Use accessToken**: Include in `Authorization: Bearer <token>` header for protected routes
3. **Token Expires**: Access token expires in 15 minutes
4. **Refresh Token**: Use refresh token to get new access token
5. **Logout**: Clear tokens on client side

---

## Validation Rules

### Registration
- Email: Valid email format, must be unique
- Password: Minimum 6 characters
- Name: Required, non-empty

### Task Creation
- Title: Required, non-empty
- Description: Optional

### Task Update
- Title: Optional, but if provided, must be non-empty
- Description: Optional
- Status: Must be `pending` or `completed`

---

## Rate Limiting

Currently no rate limiting. For production, recommend implementing:
- Login attempts: 5 per 15 minutes
- Task operations: Consider rate limiting based on user tier

---

## Pagination Best Practices

- Default page size: 10 tasks
- Maximum page size: 100 tasks
- Use `pages` in response to determine total available pages
- Always validate page number on frontend to avoid out-of-range requests

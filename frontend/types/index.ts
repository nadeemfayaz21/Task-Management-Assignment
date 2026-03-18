export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface TasksResponse {
  tasks: Task[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

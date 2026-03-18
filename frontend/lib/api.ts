import axios, { AxiosInstance } from 'axios';
import { AuthResponse, TasksResponse, Task } from '../types';

class API {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  setAccessToken(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  clearAccessToken() {
    delete this.client.defaults.headers.common['Authorization'];
  }

  // Auth endpoints
  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await this.client.post('/auth/register', {
      email,
      password,
      name,
    });
    return response.data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.client.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  }

  async refresh(refreshToken: string): Promise<{ message: string; accessToken: string }> {
    const response = await this.client.post('/auth/refresh', {
      refreshToken,
    });
    return response.data;
  }

  async logout(): Promise<{ message: string }> {
    const response = await this.client.post('/auth/logout');
    return response.data;
  }

  // Task endpoints
  async getTasks(
    page: number = 1,
    limit: number = 10,
    status?: string,
    search?: string
  ): Promise<TasksResponse> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (status) params.append('status', status);
    if (search) params.append('search', search);

    const response = await this.client.get(`/tasks?${params}`);
    return response.data;
  }

  async createTask(title: string, description?: string): Promise<Task> {
    const response = await this.client.post('/tasks', {
      title,
      description,
    });
    return response.data;
  }

  async getTask(id: number): Promise<Task> {
    const response = await this.client.get(`/tasks/${id}`);
    return response.data;
  }

  async updateTask(
    id: number,
    data: { title?: string; description?: string; status?: string }
  ): Promise<Task> {
    const response = await this.client.patch(`/tasks/${id}`, data);
    return response.data;
  }

  async deleteTask(id: number): Promise<{ message: string }> {
    const response = await this.client.delete(`/tasks/${id}`);
    return response.data;
  }

  async toggleTask(id: number): Promise<Task> {
    const response = await this.client.post(`/tasks/${id}/toggle`);
    return response.data;
  }
}

export default new API();

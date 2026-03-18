import { create } from 'zustand';
import { Task, TasksResponse } from '../types';
import api from '../lib/api';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };

  fetchTasks: (page?: number, status?: string, search?: string) => Promise<void>;
  createTask: (title: string, description?: string) => Promise<void>;
  updateTask: (id: number, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  setError: (error: string | null) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  },

  fetchTasks: async (page = 1, status?: string, search?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getTasks(page, 10, status, search);
      set({
        tasks: response.tasks,
        pagination: response.pagination,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to fetch tasks',
        isLoading: false,
      });
    }
  },

  createTask: async (title: string, description?: string) => {
    set({ isLoading: true, error: null });
    try {
      const task = await api.createTask(title, description);
      set((state) => ({
        tasks: [task, ...state.tasks],
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to create task',
        isLoading: false,
      });
      throw error;
    }
  },

  updateTask: async (id: number, data: Partial<Task>) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await api.updateTask(id, data as any);
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updated : task)),
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to update task',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteTask: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await api.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to delete task',
        isLoading: false,
      });
      throw error;
    }
  },

  toggleTask: async (id: number) => {
    try {
      const updated = await api.toggleTask(id);
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updated : task)),
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Failed to toggle task',
      });
      throw error;
    }
  },

  setError: (error: string | null) => set({ error }),
}));

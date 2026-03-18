import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import api from '../lib/api';

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
        if (accessToken) {
          api.setAccessToken(accessToken);
        }
      },
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ isLoading: loading }),

      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null });
        api.clearAccessToken();
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.register(email, password, name);
          set({
            user: response.user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            isLoading: false,
          });
          api.setAccessToken(response.accessToken);
        } catch (error: any) {
          const errorMsg = error.response?.data?.error || 'Registration failed';
          const message = errorMsg.includes('already registered') 
            ? 'Email already registered. Please login instead.' 
            : errorMsg;
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.login(email, password);
          set({
            user: response.user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            isLoading: false,
          });
          api.setAccessToken(response.accessToken);
        } catch (error: any) {
          const errorMsg = error.response?.data?.error || 'Login failed';
          const message = errorMsg.includes('Invalid email or password') 
            ? 'User not found or password is incorrect' 
            : errorMsg;
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      refreshAccessToken: async () => {
        const { refreshToken: token } = get();
        if (!token) return;

        try {
          const response = await api.refresh(token);
          set({ accessToken: response.accessToken });
          api.setAccessToken(response.accessToken);
        } catch (error: any) {
          set({ user: null, accessToken: null, refreshToken: null });
          api.clearAccessToken();
        }
      },

      initializeAuth: () => {
        const { accessToken } = get();
        if (accessToken) {
          api.setAccessToken(accessToken);
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

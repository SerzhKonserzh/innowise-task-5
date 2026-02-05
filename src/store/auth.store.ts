import { create } from 'zustand';
import { loginService, refreshSessionService, type IAuthResponse, type ILoginCredentials } from '../services/auth.service';

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (credentials: ILoginCredentials) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  initializeFromCookies: () => void;
}

const createAuthData = (response: IAuthResponse) => ({
  user: {
    id: response.id,
    username: response.username,
    email: response.email,
    firstName: response.firstName,
    lastName: response.lastName,
    gender: response.gender,
    image: response.image,
  },
  token: response.token,
  refreshToken: response.refreshToken,
  isAuthenticated: true,
});

const setAuthCookie = (authData: any) => {
  document.cookie = `auth-storage=${encodeURIComponent(JSON.stringify(authData))}; path=/; max-age=${7 * 24 * 60 * 60}`;
};

export const useAuthStore = create<IAuthState>()((set, get) => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,

  login: async (credentials: ILoginCredentials) => {
    try {
      const response: IAuthResponse = await loginService(credentials);
      const authData = createAuthData(response);
      
      setAuthCookie(authData);
      
      set({
        ...authData
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  logout: () => {
    document.cookie = 'auth-storage=; path=/; max-age=0';
    
    set({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  refreshSession: async () => {
    const { refreshToken } = get();
    if (!refreshToken) {
      get().logout();
      throw new Error('No refresh token available');
    }

    try {
      const response: IAuthResponse = await refreshSessionService(refreshToken);
      const authData = createAuthData(response);
      
      setAuthCookie(authData);
      
      set({
        ...authData
      });
    } catch (error) {
      get().logout();
      throw new Error((error as Error).message);
    }
  },
  
  initializeFromCookies: () => {
    try {
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth-storage='));
      
      if (cookie) {
        const authData = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
        set({
          user: authData.user,
          token: authData.token,
          refreshToken: authData.refreshToken,
          isAuthenticated: authData.isAuthenticated,
        });
      }
    } catch (error) {
      console.error('Error initializing auth from cookies:', error);
    }
  }
}));
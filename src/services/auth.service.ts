import { api } from './api';

export interface IAuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

export interface ILoginCredentials {
  username: string;
  password: string;
}

export const loginService = async (credentials: ILoginCredentials): Promise<IAuthResponse> => {
  try {
    const response = await api.post<IAuthResponse>('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Invalid credentials');
  }
};

export const refreshSessionService = async (refreshToken: string): Promise<IAuthResponse> => {
  try {
    const response = await api.post<IAuthResponse>('/auth/refresh', { refreshToken });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to refresh session');
  }
};
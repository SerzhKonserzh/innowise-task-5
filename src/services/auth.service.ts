import { API_URL } from '../constants';

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
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data: IAuthResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to login: ${(error as Error).message}`);
  }
};

export const refreshSessionService = async (refreshToken: string): Promise<IAuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh session');
    }

    const data: IAuthResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to refresh session: ${(error as Error).message}`);
  }
};
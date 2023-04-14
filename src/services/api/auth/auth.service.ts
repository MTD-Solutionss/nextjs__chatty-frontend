import httpClient from '@services/httpClient';
import { RegisterFormRequest, LoginFormRequest } from '@custom-types/auth';

class AuthService {
  async signUp(body: RegisterFormRequest) {
    const response = await httpClient.post('/signup', body);
    return response;
  }
  async signIn(body: LoginFormRequest) {
    const response = await httpClient.post('/signin', body);
    return response;
  }
  async forgotPassword(email: string) {
    const response = await httpClient.post('/forgot-password', { email });
    return response;
  }
  async resetPassword(token: string, body: any) {
    const response = await httpClient.post(`/reset-password/${token}`, body);
    return response;
  }
}

export const authService = new AuthService();

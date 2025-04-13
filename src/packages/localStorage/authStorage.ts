import { LocalStorage } from '.';

class AuthStorage extends LocalStorage {
  constructor() {
    super();
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  clearTokens() {
    this.removeItem('accessToken');
    this.removeItem('refreshToken');
  }

  setAccessToken(token: string) {
    this.setItem('accessToken', token);
  }

  setRefreshToken(token: string) {
    this.setItem('refreshToken', token);
  }

  getAccessToken() {
    return this.getItem('accessToken');
  }

  getRefreshToken() {
    return this.getItem('refreshToken');
  }
}

export const authStorage = new AuthStorage();

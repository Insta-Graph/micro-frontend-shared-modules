import { ACCESS_TOKEN_EXPIRATION } from '../constants';
import type { User } from '../generated';

class AuthService {
  private accessToken: string;

  private expiresIn: number;

  private userData: User | null;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.expiresIn = ACCESS_TOKEN_EXPIRATION;
    const data = localStorage.getItem('userData');
    this.userData = data ? JSON.parse(data) : null;
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public setAccessToken(newValue: string): void {
    this.accessToken = newValue;
  }

  public getAccessTokenExpiration(): number {
    return this.expiresIn;
  }

  public setAccessTokenExpiration(newValue: number): void {
    this.expiresIn = newValue;
  }

  public getUser(): User {
    return this.userData;
  }

  public setUser(newValue: User): void {
    this.userData = newValue;
  }
}

const authService = new AuthService('');

export default authService;

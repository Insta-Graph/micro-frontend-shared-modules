import { ACCESS_TOKEN_EXPIRATION } from '../constants';

class AuthService {
  private accessToken: string;

  private expiresIn: number;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.expiresIn = ACCESS_TOKEN_EXPIRATION;
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
}

const authService = new AuthService('');

export default authService;

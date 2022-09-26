import { navigate } from '@reach/router';

import type { ErrorResponse, RefreshTokenResponse } from '../constants';
import { ACCESS_TOKEN_EXPIRATION, BACKEND_HOST } from '../constants';
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
    this.setRefreshTokenTimeout();
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

  public setUser(newValue: User | null): void {
    this.userData = newValue;
  }

  public refreshToken = async (): Promise<void> => {
    try {
      if (window.location.pathname.startsWith('/auth')) {
        return;
      }
      const data = (await (
        await fetch(`${BACKEND_HOST}/refresh-token`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify({ data: null }),
        })
      ).json()) as RefreshTokenResponse | ErrorResponse;
      if ('accessToken' in data) {
        this.setAccessToken(data.accessToken);
        this.setAccessTokenExpiration(data.expiresIn);
      } else if ('status' in data && !window.location.pathname.startsWith('/auth')) {
        navigate('/feed');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(error));
    }
  };

  public setRefreshTokenTimeout(): void {
    setTimeout(() => {
      this.refreshToken();
    }, (ACCESS_TOKEN_EXPIRATION - 1) * 1000);
  }
}

const authService = new AuthService('');

export default authService;

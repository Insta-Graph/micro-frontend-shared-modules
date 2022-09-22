export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

export interface ErrorResponse {
  status: number;
  message: string;
}

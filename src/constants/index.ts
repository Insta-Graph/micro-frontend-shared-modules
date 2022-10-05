export const ACCESS_TOKEN_EXPIRATION = 900;

export const REFRESH_TOKEN_EXPIRATION = 86400;

export const PASSWORD_RESET_TOKEN_EXPIRATION = 300;

export const ENVIRONMENT = process.env.ENVIRONMENT ?? '';

export const IS_DEV_ENVIRONMENT = ENVIRONMENT === 'dev';

export const BACKEND_HOST = IS_DEV_ENVIRONMENT
  ? 'http://localhost:3000'
  : 'https://xj0lza4dv7.execute-api.us-east-1.amazonaws.com';

export { default as routes } from './routes';
export { default as config } from './config';
export * from './types';

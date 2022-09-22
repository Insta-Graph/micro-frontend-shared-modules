import React, { useEffect, useState } from 'react';

import { navigate } from '@reach/router';

import { BACKEND_HOST } from '../../constants';
import type { ErrorResponse, RefreshTokenResponse } from '../../constants/types';
import { authService } from '../../services';
import Loader from '../ui/Loader';

interface Props {
  protectedRoute?: boolean;
  children: JSX.Element;
}

const AuthProvider: React.FC<Props> = ({ children, protectedRoute }) => {
  const [isAuthenticationHandled, setIsAuthenticationHandled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticationHandled && !authService.getAccessToken()) {
      navigate('/sign-in');
    }

    if (protectedRoute && authService.getAccessToken()) {
      navigate('/');
    }
  }, [isAuthenticationHandled, protectedRoute]);

  const refreshToken = async (): Promise<void> => {
    try {
      const data = (await (
        await fetch(`${BACKEND_HOST}/refresh-token`, { method: 'POST', credentials: 'include' })
      ).json()) as RefreshTokenResponse | ErrorResponse;
      if ('accessToken' in data) {
        authService.setAccessToken(data.accessToken);
        authService.setAccessTokenExpiration(data.expiresIn);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setIsAuthenticationHandled(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  const isProtected = protectedRoute && isAuthenticationHandled && authService.getAccessToken();

  if (isProtected) {
    return <Loader />;
  }

  if (!authService.getAccessToken() && !protectedRoute) {
    return <Loader />;
  }

  if (isLoading) {
    return <Loader />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default AuthProvider;

import React, { useEffect, useState } from 'react';

import { navigate } from '@reach/router';

import { ACCESS_TOKEN_EXPIRATION, BACKEND_HOST } from '../../constants';
import type { ErrorResponse, RefreshTokenResponse } from '../../constants/types';
import { authService } from '../../services';
import Loader from '../ui/Loader';

interface Props {
  protectedRoute?: boolean;
  children: JSX.Element;
}

const AuthProvider: React.FC<Props> = ({ children, protectedRoute }) => {
  const accessToken = authService.getAccessToken();
  const [isAuthenticationHandled, setIsAuthenticationHandled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticationHandled && !accessToken) {
      navigate('/sign-in');
    }

    if (protectedRoute && accessToken) {
      navigate('/');
    }
  }, [isAuthenticationHandled, protectedRoute, accessToken]);

  const refreshToken = async (): Promise<void> => {
    try {
      const data = (await (
        await fetch(`${BACKEND_HOST}/refresh-token`, { method: 'POST', credentials: 'include' })
      ).json()) as RefreshTokenResponse | ErrorResponse;
      if ('accessToken' in data) {
        authService.setAccessToken(data.accessToken);
        authService.setAccessTokenExpiration(data.expiresIn);
      } else if ('status' in data) {
        navigate('/');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(error));
    }
  };

  useEffect(() => {
    refreshToken().finally(() => {
      setIsAuthenticationHandled(true);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
    // eslint-disable-next-line no-console
    console.log(accessToken);
    let timeout: NodeJS.Timeout;
    if (accessToken !== '') {
      // eslint-disable-next-line no-console
      console.log('===============================================');

      timeout = setTimeout(() => {
        refreshToken().finally(() => {
          setIsAuthenticationHandled(true);
          setIsLoading(false);
        });
      }, ACCESS_TOKEN_EXPIRATION * 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [accessToken]);

  const isProtected = protectedRoute && isAuthenticationHandled && accessToken;

  if (isProtected) {
    return <Loader />;
  }

  if (!accessToken && !protectedRoute) {
    return <Loader />;
  }

  if (isLoading) {
    return <Loader />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default AuthProvider;

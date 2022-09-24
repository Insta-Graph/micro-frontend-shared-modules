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
    if (isAuthenticationHandled && !accessToken && !protectedRoute) {
      navigate('/auth/sign-in');
    }

    if (protectedRoute && accessToken) {
      navigate('/');
    }
  }, [isAuthenticationHandled, protectedRoute, accessToken]);

  const refreshToken = async (): Promise<void> => {
    try {
      const data = (await (
        await fetch(`${BACKEND_HOST}/refresh-token`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify({ data: 1 }),
        })
      ).json()) as RefreshTokenResponse | ErrorResponse;
      if ('accessToken' in data) {
        authService.setAccessToken(data.accessToken);
        authService.setAccessTokenExpiration(data.expiresIn);
      } else if ('status' in data && !window.location.pathname.startsWith('/auth')) {
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
    if (!accessToken) {
      refreshToken().finally(() => {
        setIsAuthenticationHandled(true);
        setIsLoading(false);
      });
    }
  }, [accessToken]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (accessToken !== '') {
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

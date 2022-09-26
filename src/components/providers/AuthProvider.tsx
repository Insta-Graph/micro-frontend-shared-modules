import React, { useEffect, useState } from 'react';

import { navigate } from '@reach/router';

import { authService } from '../../services';
import Loader from '../ui/Loader';

interface Props {
  protectedRoute?: boolean;
  children: JSX.Element;
}

const AuthProvider: React.FC<Props> = ({ children, protectedRoute }) => {
  const accessToken = authService.getAccessToken();
  const [isAuthenticationHandled, setIsAuthenticationHandled] = useState(false);
  const [isLoading, setIsLoading] = useState(!accessToken);

  useEffect(() => {
    if (isAuthenticationHandled && !accessToken && !protectedRoute) {
      navigate('/auth/sign-in');
    }

    if (protectedRoute && accessToken) {
      navigate('/feed');
    }
  }, [isAuthenticationHandled, protectedRoute, accessToken]);

  useEffect(() => {
    if (!accessToken) {
      authService.refreshToken().finally(() => {
        setIsAuthenticationHandled(true);
        setIsLoading(false);
      });
    }
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

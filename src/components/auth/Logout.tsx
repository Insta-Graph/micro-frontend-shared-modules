import React from 'react';

import { navigate } from '@reach/router';

import { useLogoutMutation } from '../../generated';
import { authService } from '../../services';

interface Props {
  component: React.ElementType;
}

const Logout: React.FC<Props> = ({ component: Component }) => {
  const [logout] = useLogoutMutation();

  const handleLogout = async (): Promise<void> => {
    const result = await logout();
    if (result.data.logout.success) {
      authService.setAccessToken('');
      authService.setUser(null);
      localStorage.removeItem('userData');
      navigate('/auth/sign-in');
    }
  };
  return <Component onClick={handleLogout}>Logout</Component>;
};

export default Logout;

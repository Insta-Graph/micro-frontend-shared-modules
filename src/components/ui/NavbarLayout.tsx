import React from 'react';

import { Box } from '@mui/material';

import UserNavbar from './UserNavbar';

const NavbarLayout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <Box>
      <UserNavbar />
      {children}
    </Box>
  );
};

export default NavbarLayout;

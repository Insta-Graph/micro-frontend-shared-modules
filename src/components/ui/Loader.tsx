import React from 'react';

import { Box, CircularProgress } from '@mui/material';

import { AuthContainer } from '../auth';

const Loader: React.FC = () => {
  return (
    <AuthContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress size={60} color="primary" />
      </Box>
    </AuthContainer>
  );
};

export default Loader;

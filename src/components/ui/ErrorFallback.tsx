import { Box, Button, Typography } from '@mui/material';
import type { FallbackProps } from 'react-error-boundary';

import { AuthContainer } from '../auth';

import CustomLink from './CustomLink';
import ErrorImage from './ErrorImage';

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  // eslint-disable-next-line no-console
  console.log(error.message);

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
        <ErrorImage />
        <Typography variant="h2">Aaaah! Something went wrong</Typography>
        <Typography variant="caption">We are working on fixing the problem.</Typography>
        <Typography variant="caption">Please try again.</Typography>
        <Button size="large" type="button" variant="contained" color="secondary">
          <CustomLink to="/feed">Back to home</CustomLink>
        </Button>
      </Box>
    </AuthContainer>
  );
};

export default ErrorFallback;

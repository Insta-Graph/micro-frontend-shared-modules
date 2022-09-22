import React from 'react';

import { useMediaQuery, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AuthHeader: React.FC<{ pageTitle: string; pageDescription: string }> = ({
  pageTitle,
  pageDescription,
}) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Grid
      container
      direction={matchDownSM ? 'column-reverse' : 'row'}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Stack alignItems="center" justifyContent="center" spacing={1}>
          <Typography
            color={theme.palette.secondary.main}
            gutterBottom
            variant={matchDownSM ? 'h3' : 'h2'}
          >
            {pageTitle}
          </Typography>
          <Typography
            variant="caption"
            fontSize="16px"
            textAlign={matchDownSM ? 'center' : 'inherit'}
          >
            {pageDescription}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AuthHeader;

import { Divider, Grid, Link } from '@mui/material';

import { SnapifyLogo } from '../icons';

import AuthCardWrapper from './AuthCardWrapper';
import AuthContainer from './AuthContainer';
import AuthFooter from './AuthFooter';

const AuthLayout: React.FC<{
  children: JSX.Element;
  cardFooter: JSX.Element;
  cardHeader?: JSX.Element;
}> = ({ children, cardFooter, cardHeader }) => {
  return (
    <AuthContainer>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: 'calc(100vh - 68px)' }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ maxWidth: '200px' }}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link component="div">
                      <SnapifyLogo />
                    </Link>
                  </Grid>
                  {cardHeader && (
                    <Grid item xs={12}>
                      {cardHeader}
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    {children}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      {cardFooter}
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthContainer>
  );
};

export default AuthLayout;

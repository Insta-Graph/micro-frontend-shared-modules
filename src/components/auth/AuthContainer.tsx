import { styled } from '@mui/material/styles';

const AuthContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: '100vh',
}));

export default AuthContainer;

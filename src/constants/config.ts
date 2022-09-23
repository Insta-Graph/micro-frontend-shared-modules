export const drawerWidth = 260;

export const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: '/',
  defaultPath: '/dashboard/default',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
};

export const TOKEN_REFRESH_EXPIRATION = 86400;

export const ACCESS_TOKEN_EXPIRATION = 30;

export const BACKEND_HOST = 'http://localhost:3000/graphql';

const constants = { drawerWidth, config, TOKEN_REFRESH_EXPIRATION };

export default constants;

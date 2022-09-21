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

const constants = { drawerWidth, config, TOKEN_REFRESH_EXPIRATION };

export default constants;

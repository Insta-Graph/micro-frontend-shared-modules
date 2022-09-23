import { ApolloClient, InMemoryCache } from '@apollo/client';

import { BACKEND_HOST } from '../constants';
import { authService } from '../services';

const client = new ApolloClient({
  uri: BACKEND_HOST,
  cache: new InMemoryCache(),
  credentials: 'include',
  headers: {
    authorization: authService.getAccessToken() ? `Bearer ${authService.getAccessToken()}` : '',
  },
});

export default client;

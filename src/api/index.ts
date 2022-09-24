import 'cross-fetch/polyfill';

import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { BACKEND_HOST } from '../constants';
import { authService } from '../services';

const getApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    uri: `${BACKEND_HOST}/graphql`,
    cache: new InMemoryCache(),
    credentials: 'include',
    headers: {
      authorization: authService.getAccessToken() ? `Bearer ${authService.getAccessToken()}` : '',
    },
  });
};

export default getApolloClient;

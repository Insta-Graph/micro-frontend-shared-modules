import React from 'react';

import { ApolloProvider as Provider } from '@apollo/client';

import getApolloClient from '../../api';

const ApolloProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const apolloClient = getApolloClient();

  return <Provider client={apolloClient}>{children}</Provider>;
};

export default ApolloProvider;

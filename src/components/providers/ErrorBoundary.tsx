/* eslint-disable no-console */
import React from 'react';

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '../ui';

const ErrorBoundary: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const myErrorHandler = (error: Error, info: { componentStack: string }): void => {
    console.log(error);
    console.log(JSON.stringify(error));
    console.log(JSON.stringify(info));
  };
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;

import React from 'react';

import { CssBaseline, ThemeProvider as MaterialThemeProvider } from '@mui/material';

import { createCustomTheme } from '../../themes';

const customTheme = createCustomTheme();

const ThemeProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <MaterialThemeProvider theme={customTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </MaterialThemeProvider>
  );
};

export default ThemeProvider;

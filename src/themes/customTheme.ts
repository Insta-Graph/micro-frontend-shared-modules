import type { Theme, ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

import componentStyleOverrides from './componentStyleOverrides';
import themePalette from './palette';
import themeTypography from './typography';
import colors from './variables';

declare module '@mui/material/styles' {
  interface Palette {
    orange: Palette['primary'];
    dark: Palette['primary'];
  }
  interface PaletteOptions {
    orange: PaletteOptions['primary'];
    dark: PaletteOptions['primary'];
  }

  interface PaletteColor {
    200: string;
    800: string;
  }
  interface SimplePaletteColorOptions {
    200?: string;
    800?: string;
  }

  interface TypeText {
    dark: string;
    hint: string;
  }

  interface TypographyVariants {
    mainContent: React.CSSProperties;
    customInput: unknown;
    menuCaption: React.CSSProperties;
    subMenuCaption: React.CSSProperties;
    commonAvatar: React.CSSProperties;
    smallAvatar: React.CSSProperties;
    mediumAvatar: React.CSSProperties;
    largeAvatar: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    mainContent?: React.CSSProperties;
    customInput: unknown;
    menuCaption?: React.CSSProperties;
    subMenuCaption?: React.CSSProperties;
    commonAvatar: React.CSSProperties;
    smallAvatar: React.CSSProperties;
    mediumAvatar: React.CSSProperties;
    largeAvatar: React.CSSProperties;
  }
}

export const theme = (): Theme => {
  const color = colors;

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
  };

  const themeOptions: ThemeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import Settings from '../../settings/settings.json';

export const primary = `${Settings.colors.primary}`;
export const secondary = `${Settings.colors.secondary}`;
export const black = `${Settings.colors.black}`;
export const white = `${Settings.colors.white}`;

const baseTypography = {
  fontSize: 16,
  htmlFontSize: 16,
  fontFamily: 'Inter, sans-serif',
  h2: {
    fontWeight: 500,
    fontFamily: 'Inter, sans-serif',
  },
  h5: {
    fontWeight: 500,
    fontFamily: 'Inter, sans-serif',
  },
  body1: {
    fontWeight: 500,
    fontFamily: 'Inter, sans-serif',
  },
};

const commonOverrides = (textColor, backgroundColor) => ({
  MuiCssBaseline: {
    '@global': {
      body: {
        color: textColor,
        backgroundColor: backgroundColor,
        fontFamily: 'Inter, sans-serif',
      },
    },
  },
  MuiIconButton: {
    root: {
      boxShadow:
        '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
      '&:hover': {
        backgroundColor: primary,
      },
      transition: 'all 0.5s ease',
    },
  },
  MuiFab: {
    root: {
      width: '2.5rem',
      height: '2.5rem',
      fontSize: '1.25rem',
    },
    primary: {
      color: textColor,
      backgroundColor: 'transparent',
      '&:hover': {
        color: textColor,
        backgroundColor: primary,
      },
      transition: 'all 0.5s ease !important',
    },
  },
  MuiSpeedDialAction: {
    fab: {
      color: textColor,
      backgroundColor: 'transparent',
      '&:hover': {
        color: textColor,
        backgroundColor: primary,
      },
      transition: 'all 0.5s ease',
      margin: '0px',
      marginBottom: '16px',
    },
  },
  MuiTooltip: {
    tooltip: {
      fontFamily: 'Inter, sans-serif',
      backgroundColor: primary,
      color: textColor,
      fontSize: 11,
    },
  },
});

export const DarkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      background: {
        default: black,
      },
      foreground: {
        default: white,
      },
    },
    typography: baseTypography,
    overrides: commonOverrides(white, black),
  })
);

export const LightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      background: {
        default: white,
      },
      foreground: {
        default: black,
      },
    },
    typography: baseTypography,
    overrides: commonOverrides(black, white),
  })
);

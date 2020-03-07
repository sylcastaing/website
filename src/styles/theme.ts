import { Colors, BreakPoints, DefaultTheme, Font } from 'styled-components';

const colors: Colors = {
  primary: '#138D97',
  primaryDarken: '#00626B',
  secondary: '#8B575C',
  light: '#ecf0f1',
  dark: '#262626',
  darkBlue: '#2C3E50',
  grey: '#dddddd',
  white: '#ffffff',
  black: '#000000',
};

const breakpoints: BreakPoints = {
  content: 1280,
  desktop: 960,
  tablet: 760,
  mobile: 560,
};

const font: Font = {
  family: "'Roboto Mono', monospace",
  weights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
};

const theme: DefaultTheme = {
  colors,
  font,
  breakpoints,
};

export default theme;

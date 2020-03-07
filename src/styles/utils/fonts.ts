import theme from '../theme';
import { DefaultTheme, ThemeProps } from 'styled-components';

export const fontWeight = (Object.keys(theme.font.weights) as (keyof typeof theme.font.weights)[]).reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: (props: ThemeProps<DefaultTheme>) => props.theme.font.weights[curr],
  }),
  {} as { [key in keyof typeof theme.font.weights]: (props: ThemeProps<DefaultTheme>) => number },
);

export const titleFontSize = (Object.keys(theme.font.sizes.titles) as (keyof typeof theme.font.sizes.titles)[]).reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: (props: ThemeProps<DefaultTheme>) => props.theme.font.sizes.titles[curr],
  }),
  {} as { [key in keyof typeof theme.font.sizes.titles]: (props: ThemeProps<DefaultTheme>) => string },
);

export const bodyFontSize = (Object.keys(theme.font.sizes.body) as (keyof typeof theme.font.sizes.body)[]).reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: (props: ThemeProps<DefaultTheme>) => props.theme.font.sizes.body[curr],
  }),
  {} as { [key in keyof typeof theme.font.sizes.body]: (props: ThemeProps<DefaultTheme>) => string },
);

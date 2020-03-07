import theme from '../theme';
import { DefaultTheme, ThemeProps } from 'styled-components';

export const fontWeight = (Object.keys(theme.font.weights) as (keyof typeof theme.font.weights)[]).reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: (props: ThemeProps<DefaultTheme>) => props.theme.font.weights[curr],
  }),
  {} as { [key in keyof typeof theme.font.weights]: (props: ThemeProps<DefaultTheme>) => number },
);

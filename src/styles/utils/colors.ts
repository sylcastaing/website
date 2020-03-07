import theme from '../theme';
import { ThemeProps, DefaultTheme } from 'styled-components';

export const colors = (Object.keys(theme.colors) as (keyof typeof theme.colors)[]).reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: (props: ThemeProps<DefaultTheme>) => props.theme.colors[curr],
  }),
  {} as { [key in keyof typeof theme.colors]: (props: ThemeProps<DefaultTheme>) => string },
);

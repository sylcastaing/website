import theme from '../theme';
import { css, DefaultTheme, ThemedCssFunction } from 'styled-components';

export const mediaMin = (Object.keys(theme.breakpoints) as (keyof typeof theme.breakpoints)[]).reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: (first: any, ...interpolations: any[]) => css`
      ${props => css`
        @media screen and (min-width: ${props.theme.breakpoints[curr] + 1}px) {
          ${css(first, ...interpolations)}
        }
      `}
    `,
  }),
  {} as { [key in keyof typeof theme.breakpoints]: ThemedCssFunction<DefaultTheme> },
);

export const mediaMax = (Object.keys(theme.breakpoints) as (keyof typeof theme.breakpoints)[]).reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: (first: any, ...interpolations: any[]) => css`
      ${props => css`
        @media screen and (max-width: ${props.theme.breakpoints[curr]}px) {
          ${css(first, ...interpolations)}
        }
      `}
    `,
  }),
  {} as { [key in keyof typeof theme.breakpoints]: ThemedCssFunction<DefaultTheme> },
);

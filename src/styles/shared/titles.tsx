import theme from '../theme';
import styled, { FlattenInterpolation, ThemeProps, DefaultTheme, css } from 'styled-components';
import { colors, fontWeight, titleFontSize } from '../utils';

import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

export type TitlesTypes = keyof typeof theme.font.sizes.titles;

export const titlesStyles: { [key in TitlesTypes]: FlattenInterpolation<ThemeProps<DefaultTheme>> } = {
  h1: css`
    font-size: ${titleFontSize.h1};
    font-weight: ${fontWeight.medium};
    line-height: 1.13;
  `,
  h2: css`
    font-size: ${titleFontSize.h2};
    font-weight: ${fontWeight.bold};
    line-height: 1.33;
  `,
  h3: css`
    font-size: ${titleFontSize.h3};
    font-weight: ${fontWeight.regular};
    line-height: 1.25;
  `,
};

export const getTitleStyle = (type?: TitlesTypes): FlattenInterpolation<ThemeProps<DefaultTheme>> => {
  return pipe(
    O.fromNullable(type),
    O.fold(
      () => titlesStyles.h1,
      t => titlesStyles[t],
    ),
  );
};

interface TitleProps {
  level?: TitlesTypes;
  inverted?: boolean;
}

export const Title = styled.h1<TitleProps>`
  word-wrap: break-word;

  ${props => getTitleStyle(props.level)};
  ${props =>
    props.inverted &&
    css`
      color: ${colors.white};
    `};
`;

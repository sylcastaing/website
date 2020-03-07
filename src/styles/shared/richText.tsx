import styled, { css } from 'styled-components';
import { titlesStyles } from './titles';
import { colors, fontWeight } from '../utils';

export const RichTextContainer = styled.div<{ inverted?: boolean }>`
  h1 {
    ${titlesStyles.h1};
    margin: 30px 0 40px;
  }

  h2 {
    ${titlesStyles.h2};
    margin: 30px 0 40px;
  }

  h3 {
    ${titlesStyles.h3};
    margin: 20px 0 30px;
  }

  strong {
    font-weight: ${fontWeight.bold};
  }

  em {
    font-style: italic;
  }

  p {
    min-height: 20px;
    margin-bottom: 15px;
    line-height: 1.56;
  }

  .embed {
    padding: 25px 0;

    > div {
      position: relative;
      padding-bottom: 56.25%;
      overflow: hidden;

      > iframe {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
    }
  }

  pre {
    padding: 20px;
    background: ${colors.light};
  }

  .block-img {
    img {
      max-width: 100%;
    }
  }
  ${props =>
    props.inverted &&
    css`
      color: ${colors.white};
    `};
`;

import styled from 'styled-components';
import { bodyFontSize, colors, mediaMax } from '../../../../styles/utils';
import PrismicImage from '../../../../shared/components/prismic/PrismicImage';
import { Title } from '../../../../styles/shared/titles';
import RichText from '../../../../shared/components/prismic/RichText';

export const HomeHeaderContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const HomeHeaderColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  min-height: 100vh;

  ${mediaMax.desktop`
    width: 100%;
  `};
`;

export const HomeHeaderLeft = styled(HomeHeaderColumn)`
  flex-direction: column;
  padding: 20px;
`;

export const HomeHeaderAvatar = styled(PrismicImage)`
  border-radius: 50%;
`;

export const HomeHeaderTitle = styled(Title)`
  margin-top: 40px;
  line-height: 1.25;

  > em {
    color: ${colors.primary};
    display: block;
  }
`;

export const HomeHeaderSubtitle = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: ${bodyFontSize.large};
`;

export const HomeHeaderRight = styled(HomeHeaderColumn)`
  position: relative;
  background-color: ${colors.primary};
  padding: 20px;
`;

export const HomeHeaderRightContent = styled(RichText)`
  max-width: 650px;
  text-align: center;

  > p {
    font-size: ${bodyFontSize.large};
  }
`;

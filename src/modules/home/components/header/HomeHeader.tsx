import React, { FC } from 'react';

import * as Styled from './HomeHeader.styles';
import { PrismicHomeContent } from '../../model';
import Hello from './hello/Hello';
import { renderPrismicElement } from '../../../../core/prismic';

interface HomeHeaderProps {
  content: PrismicHomeContent;
}

const HomeHeader: FC<HomeHeaderProps> = ({ content }) => (
  <Styled.HomeHeaderContainer>
    <Styled.HomeHeaderLeft>
      <Styled.HomeHeaderAvatar image={content.avatar} width={250} />
      <Hello />
      <Styled.HomeHeaderTitle level="h1">
        I'm <em>Sylvain Castaing</em>
      </Styled.HomeHeaderTitle>
      <Styled.HomeHeaderSubtitle>A Front-End Developer</Styled.HomeHeaderSubtitle>
    </Styled.HomeHeaderLeft>
    <Styled.HomeHeaderRight>
      {renderPrismicElement(content.intro, intro => (
        <Styled.HomeHeaderRightContent content={intro} inverted />
      ))}
    </Styled.HomeHeaderRight>
  </Styled.HomeHeaderContainer>
);

export default HomeHeader;

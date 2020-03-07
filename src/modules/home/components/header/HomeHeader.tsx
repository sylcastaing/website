import React, { FC } from 'react';

import * as Styled from './HomeHeader.styles';

const HomeHeader: FC = () => (
  <Styled.HomeHeaderContainer>
    <Styled.HomeHeaderLeft>a</Styled.HomeHeaderLeft>
    <Styled.HomeHeaderRight>b</Styled.HomeHeaderRight>
  </Styled.HomeHeaderContainer>
);

export default HomeHeader;

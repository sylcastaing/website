import styled from 'styled-components';
import { colors } from '../../../../styles/utils';

export const HomeHeaderContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

export const HomeHeaderLeft = styled.div`
  width: 50%;
  min-height: 100vh;
`;

export const HomeHeaderRight = styled.div`
  width: 50%;
  min-height: 100vh;
  background-color: ${colors.primary};
`;

import styled from 'styled-components';
import { colors } from '../../../../../styles/utils';

export const SocialContainer = styled.ul`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 10px;
  bottom: 0;
  left: 0;
  width: 100%;
`;

export const SocialItem = styled.li`
  padding: 0 40px;

  i {
    font-size: 25px;
    color: ${colors.white};
    transition: transform 0.5s cubic-bezier(0.47, 2.02, 0.31, -0.36);
  }

  a:hover {
    i {
      transform: scale(1.3);
    }
  }
`;

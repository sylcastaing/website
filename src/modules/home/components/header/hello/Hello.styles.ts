import styled, { DefaultTheme, keyframes, ThemeProps } from 'styled-components';
import { bodyFontSize } from '../../../../../styles/utils';

export const HelloContainer = styled.div`
  margin-top: 35px;
  font-size: ${bodyFontSize.large};

  > span {
    margin: 0 3px;
  }
`;

export const HelloKeyWord = styled.span`
  color: #708;
`;

export const HelloDef = styled.span`
  color: #00f;
`;

const blinkAnimation = (props: ThemeProps<DefaultTheme>) => keyframes`
  from {
    border-right: 2px solid ${props.theme.colors.darkBlue};
  }
  49% {
    border-right: 2px solid ${props.theme.colors.darkBlue};
  }
  50% {
    border-right: 2px solid ${props.theme.colors.white};
  }
  to {
    border-right: 2px solid ${props.theme.colors.white};
  }
`;

export const HelloString = styled.span`
  color: #a11;
  border-right: 2px solid ${props => props.theme.colors.darkBlue};
  margin: 0 0 0 3px !important;
  animation: ${blinkAnimation} 1.1s infinite;
`;

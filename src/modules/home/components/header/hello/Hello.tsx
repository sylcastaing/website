import React, { FC, useEffect, useState } from 'react';

import * as Styled from './Hello.styles';

interface HelloState {
  currentWordIndex: number;
  currentLetterIndex: number;
  ltr: boolean;
  sleep: number;
}

const words: ReadonlyArray<string> = ["'Hello !'", "'Bonjour !'", "'Hallo !'"];

function animate(state: HelloState): HelloState {
  const { currentWordIndex, currentLetterIndex, ltr, sleep } = state;

  const word = words[currentWordIndex];
  if (sleep === 0) {
    if (ltr) {
      if (currentLetterIndex === word.length) {
        return {
          ...state,
          sleep: 3,
        };
      } else {
        return {
          ...state,
          currentLetterIndex: currentLetterIndex + 1,
        };
      }
    } else {
      if (currentLetterIndex === 0) {
        return {
          ...state,
          ltr: true,
          currentWordIndex: currentWordIndex < words.length - 1 ? currentWordIndex + 1 : 0,
        };
      } else {
        return {
          ...state,
          currentLetterIndex: currentLetterIndex - 1,
        };
      }
    }
  } else {
    if (sleep === 1) {
      return {
        ...state,
        ltr: false,
        currentLetterIndex: currentLetterIndex - 1,
        sleep: 0,
      };
    } else {
      return {
        ...state,
        sleep: sleep - 1,
      };
    }
  }
}

const Hello: FC = () => {
  const [state, setState] = useState<HelloState>({
    currentWordIndex: 0,
    currentLetterIndex: 0,
    ltr: true,
    sleep: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => setState(animate), 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <Styled.HelloContainer>
      <Styled.HelloKeyWord>const</Styled.HelloKeyWord>
      <Styled.HelloDef>t</Styled.HelloDef>
      <span>=</span>
      <Styled.HelloString>{words[state.currentWordIndex].slice(0, state.currentLetterIndex)}</Styled.HelloString>
    </Styled.HelloContainer>
  );
};

export default Hello;

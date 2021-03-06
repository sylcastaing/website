import 'styled-components';

declare module 'styled-components' {
  export interface Colors {
    readonly primary: string;
    readonly primaryDarken: string;
    readonly secondary: string;
    readonly light: string;
    readonly dark: string;
    readonly darkBlue: string;
    readonly grey: string;
    readonly white: string;
    readonly black: string;
  }

  export interface FontWeights {
    readonly regular: number;
    readonly medium: number;
    readonly semiBold: number;
    readonly bold: number;
  }

  export interface FontSizes {
    readonly titles: {
      readonly h1: string;
      readonly h2: string;
      readonly h3: string;
    };
    readonly body: {
      readonly large: string;
      readonly standard: string;
      readonly medium: string;
      readonly small: string;
    };
  }

  export interface Font {
    readonly family: string;
    readonly weights: FontWeights;
    readonly sizes: FontSizes;
  }

  export interface BreakPoints {
    readonly content: number;
    readonly desktop: number;
    readonly tablet: number;
    readonly mobile: number;
  }

  export interface DefaultTheme {
    readonly colors: Colors;
    readonly font: Font;
    readonly breakpoints: BreakPoints;
  }
}

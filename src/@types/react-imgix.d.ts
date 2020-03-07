declare module 'react-imgix' {
  import { ComponentType, InputHTMLAttributes } from 'react';

  export interface ImgixProps extends InputHTMLAttributes<HTMLInputElement> {
    sizes?: string;
    imgixParams?: any;
    attributeConfig?: any;
  }

  const Imgix: ComponentType<ImgixProps>;

  export function buildURL(url: string, params: any): string;

  export default Imgix;
}

declare module 'prismic-reactjs' {
  import { ComponentType, ReactNode } from 'react';
  import { PrismicDocument } from '../core/prismic/prismic.model';
  import { PrismicLink } from '../core/prismic';

  export interface RichTextFunctions {
    asText: (element: Array<unknown>) => string;
  }

  export type HyperlinkSerializer = (type: string, element: { data: PrismicDocument }, content: ReactNode) => ReactNode;

  export interface RichTextProps {
    render: Array<unknown>;
    linkResolver?: (document: PrismicDocument) => string;
    serializeHyperlink?: HyperlinkSerializer;
  }

  export const RichText: ComponentType<RichTextProps> & RichTextFunctions;

  export const Link: {
    url: (link: PrismicLink, linkResolver?: (document: PrismicDocument) => string) => string;
  };
}

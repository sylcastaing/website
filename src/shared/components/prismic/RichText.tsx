import React, { useMemo } from 'react';

import { HyperlinkSerializer, RichText as PrismicRichText } from 'prismic-reactjs';

import { PrismicRichText as PrismicRichTextType, getLinkPropsFromPrismicLink } from '../../../core/prismic';
import { RichTextContainer } from '../../../styles/shared/richText';
import CustomLink from '../link/CustomLink';

const defaultHyperLinkSerializer: HyperlinkSerializer = (type, { data }, content) => {
  const linkProps = getLinkPropsFromPrismicLink(data);

  return (
    <CustomLink key={`${linkProps.href} ${linkProps.to} ${linkProps.target}`} {...linkProps}>
      {content}
    </CustomLink>
  );
};

interface RichTextProps {
  content: PrismicRichTextType;
  className?: string;
  inverted?: boolean;
}

const RichText = ({ content, className, inverted }: RichTextProps) => {
  return useMemo(
    () => (
      <RichTextContainer className={className} inverted={inverted}>
        <PrismicRichText render={content} serializeHyperlink={defaultHyperLinkSerializer} />
      </RichTextContainer>
    ),
    [content, className, inverted],
  );
};

RichText.asText = PrismicRichText.asText;

export default RichText;

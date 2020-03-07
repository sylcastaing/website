import React, { FC } from 'react';

import { PrismicImage as PrismicImageType } from '../../../core/prismic';

import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import Imgix, { ImgixProps } from 'react-imgix';

interface PrismicImageProps extends ImgixProps {
  image?: PrismicImageType;
  fallBackImage?: string;
  className?: string;
}

const PrismicImage: FC<PrismicImageProps> = ({ image, fallBackImage, className, ...imgxProps }) => {
  const optImage = O.fromNullable(image);

  const altText: string | undefined = pipe(
    optImage,
    O.mapNullable(img => img.alt),
    O.toUndefined,
  );

  const url: O.Option<string> = pipe(
    optImage,
    O.mapNullable(img => img.url),
    O.alt(() => O.fromNullable(fallBackImage)),
  );

  return pipe(
    url,
    O.map(src => <Imgix src={src} alt={altText} className={className} {...imgxProps} />),
    O.toNullable,
  );
};

export default PrismicImage;

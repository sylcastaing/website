import { DefaultPrismicContent, PrismicImage, PrismicRichText } from '../../core/prismic';

export interface PrismicHomeContent extends DefaultPrismicContent {
  avatar: PrismicImage;
  intro: PrismicRichText;
}

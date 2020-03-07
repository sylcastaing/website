import { Document } from 'prismic-javascript/d.ts/documents';

import * as TE from 'fp-ts/lib/TaskEither';
import * as EI from 'fp-ts/lib/Either';
import ApiSearchResponse from 'prismic-javascript/d.ts/ApiSearchResponse';

export type PrismicPageType = 'home';

export interface PrismicDocument<T = unknown> extends Document {
  data: T;
}

export interface PrismicPaginateResponse<T = unknown> extends ApiSearchResponse {
  results: Array<PrismicDocument<T>>;
}

export enum PrismicErrorCode {
  TECHNICAL = 'TECHNICAL',
  NOT_FOUND = 'NOT_FOUND',
}

export class PrismicError extends Error {
  constructor(readonly code: PrismicErrorCode, message?: string) {
    super(message);
  }
}

export const technicalPrismicError = new PrismicError(PrismicErrorCode.TECHNICAL);
export const notFoundPrismicError = new PrismicError(PrismicErrorCode.NOT_FOUND);

export type PrismicTask<T = unknown> = TE.TaskEither<PrismicError, T>;
export type PrismicResponse<T = unknown> = EI.Either<PrismicError, T>;

export interface PrismicPageInitialProps<T = unknown> {
  document: PrismicResponse<PrismicDocument<T>>;
}

export type PrismicText = string;
export type PrismicRichText = Array<unknown>;
export type PrismicTitle = PrismicRichText;
export type PrismicDate = string;
export type PrismicColor = string | null;

export interface PrismicImage {
  alt?: string | null;
  copyright?: string | null;
  dimensions: {
    width: number;
    height: number;
  };
  url: string;
}

export interface PrismicEmbed {
  author_name: string;
  author_url: string;
  embed_url: string;
  width: number;
  height: number;
  html: string;
  provider_name: string;
  provider_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  thumbnail_url: string;
  title: string;
  type: string;
  version: string;
}

export interface PrismicLink extends PrismicDocument {
  link_type: string;
  url?: string;
  target?: string;
}

export type PrismicElement =
  | PrismicText
  | PrismicRichText
  | PrismicTitle
  | PrismicImage
  | PrismicEmbed
  | PrismicLink
  | PrismicColor;

export interface PrismicSlice<P = unknown, I = unknown> {
  slice_type: string;
  primary: P;
  items: Array<I>;
}

export interface DefaultPrismicContent {
  meta_title: PrismicText;
  meta_description: PrismicText;
  body?: Array<PrismicSlice>;
}

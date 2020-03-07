import * as Prismic from 'prismic-javascript';

import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';

import { getPublicRuntimeConfigValue } from '../../shared/utils/config';
import {
  notFoundPrismicError,
  PrismicDocument,
  PrismicPageType,
  PrismicPaginateResponse,
  PrismicTask,
  technicalPrismicError,
} from './model';
import { defaultLinkResolver } from './resolver';
import { NextPageContext } from 'next';
import { DefaultClient } from 'prismic-javascript/d.ts/client';

export function getPrismicApiEndPoint(): string {
  return pipe(
    getPublicRuntimeConfigValue('PRISMIC_API_ENDPOINT'),
    O.getOrElse(() => ''),
  );
}

function handlePrismicError(err: unknown) {
  console.error(err);
  return technicalPrismicError;
}

function handlePrismicNotFound<T>(t: PrismicDocument<T>): PrismicTask<PrismicDocument<T>> {
  return pipe(
    O.fromNullable(t),
    O.fold(
      () => TE.left(notFoundPrismicError),
      v => TE.right(v),
    ),
  );
}

function transformPromiseToPrismicTask<T = unknown>(f: () => Promise<T>): PrismicTask<T> {
  return TE.tryCatch(f, handlePrismicError);
}

export function getPrismicApi({ req }: NextPageContext): PrismicTask<DefaultClient> {
  return TE.right(Prismic.client(getPrismicApiEndPoint(), { req }));
}

function computePrismicApi(ctx: NextPageContext, api?: DefaultClient): PrismicTask<DefaultClient> {
  return pipe(
    O.fromNullable(api),
    O.fold(
      () => getPrismicApi(ctx),
      api => TE.right(api),
    ),
  );
}

export function getPrismicPreview(token: string, api: DefaultClient): PrismicTask<string> {
  return TE.tryCatch(() => api.previewSession(token, defaultLinkResolver, '/'), handlePrismicError);
}

export function getPrismicDocumentByType<T = unknown>(
  type: PrismicPageType,
  api?: DefaultClient,
): (ctx: NextPageContext) => PrismicTask<PrismicDocument<T>> {
  return ctx =>
    pipe(
      computePrismicApi(ctx, api),
      TE.chain(api => transformPromiseToPrismicTask(() => api.getSingle(type, {}))),
      TE.chain(handlePrismicNotFound),
    );
}

export function getPrismicDocumentByUid<T = unknown>(
  type: PrismicPageType,
  uid: string,
  api?: DefaultClient,
): (ctx: NextPageContext) => PrismicTask<PrismicDocument<T>> {
  return ctx =>
    pipe(
      computePrismicApi(ctx, api),
      TE.chain(api => transformPromiseToPrismicTask(() => api.getByUID(type, uid, {}))),
      TE.chain(handlePrismicNotFound),
    );
}

export function getPrismicDocumentsByIds<T = unknown>(
  ids?: Array<string>,
  api?: DefaultClient,
): (ctx: NextPageContext) => PrismicTask<PrismicPaginateResponse<T>> {
  return ctx =>
    pipe(
      computePrismicApi(ctx, api),
      TE.chain(api => transformPromiseToPrismicTask(() => api.getByIDs(ids?.filter(id => !!id) ?? [], {}))),
    );
}

export function getPrismicPaginatedByType<T = unknown>(
  type: PrismicPageType,
  pageSize: number,
  page: number,
  predicates?: Array<string>,
  orderings?: string,
  api?: DefaultClient,
): (ctx: NextPageContext) => PrismicTask<PrismicPaginateResponse<T>> {
  return ctx =>
    pipe(
      computePrismicApi(ctx, api),
      TE.chain(api =>
        transformPromiseToPrismicTask(() =>
          api.query([Prismic.Predicates.at('document.type', type), ...(predicates ? predicates : [])], {
            pageSize,
            page,
            orderings: orderings ?? '[document.first_publication_date desc]',
          }),
        ),
      ),
    );
}

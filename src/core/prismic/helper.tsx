import React, { HTMLProps, ReactNode } from 'react';

import { NextPageContext } from 'next';

import {
  DefaultPrismicContent,
  PrismicDocument,
  PrismicElement,
  PrismicError,
  PrismicErrorCode,
  PrismicLink,
  PrismicPageInitialProps,
  PrismicResponse,
  PrismicSlice,
  PrismicTask,
} from './model';

import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';
import * as EI from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import FullError from '../../modules/errors/full/FullError';
import { PageSeoProps } from '../../layout/seo/PageSeo';
import { Do } from 'fp-ts-contrib/lib/Do';
import { CustomLinkProps } from '../../shared/components/link/CustomLink';
import { getCustomLinkPropsFromPrismicDocument } from './resolver';
import RichText from '../../shared/components/prismic/RichText';

export function getStatusCodeFromPrismicError(err: PrismicError): number {
  return err.code === PrismicErrorCode.NOT_FOUND ? 404 : 500;
}

export function handlePrismicError({ res }: NextPageContext): (err: PrismicError) => PrismicError {
  return err => {
    if (res) {
      res.statusCode = getStatusCodeFromPrismicError(err);
    }

    return err;
  };
}

export function getPrismicPageInitialProps<T = unknown>(
  t: (ctx: NextPageContext) => PrismicTask<PrismicDocument<T>>,
): (ctx: NextPageContext) => Promise<PrismicPageInitialProps<T>> {
  return ctx => pipe(t(ctx), TE.mapLeft(handlePrismicError(ctx)))().then(page => ({ document: page }));
}

export function renderPrismicPage<T = unknown>(
  f: (d: T) => JSX.Element | null,
): (page: PrismicResponse<T>) => JSX.Element | null {
  return page =>
    pipe(
      page,
      EI.fold(err => <FullError statusCode={getStatusCodeFromPrismicError(err)} />, f),
    );
}

export function filterPrismicElement<T extends PrismicElement>(element: T | undefined | null): O.Option<T> {
  return pipe(
    O.fromNullable(element),
    O.filter(el => {
      if (Array.isArray(el)) {
        return el.length > 0 && RichText.asText(el) !== '';
      } else if (typeof el === 'string') {
        return el !== '';
      } else if (typeof el === 'object') {
        // link_type -> fix PrismicLink
        return Object.keys(el).length > 0 && (el as any).link_type !== 'Any';
      } else {
        return true;
      }
    }),
  );
}

export function renderPrismicElement<T extends PrismicElement>(
  element: T | undefined | null,
  onSome: (element: T) => ReactNode,
  onNone?: () => ReactNode,
): ReactNode {
  const onNoneFunction = onNone ? onNone : () => null;

  return pipe(filterPrismicElement(element), O.fold(onNoneFunction, onSome));
}

export function renderPrismicElements<A extends PrismicElement, B extends PrismicElement>(
  element1: A,
  element2: B,
  onSome: (element1: A, element2: B) => ReactNode,
  onNone?: () => ReactNode,
): ReactNode {
  const onNoneFunction = onNone ? onNone : () => null;

  const result = Do(O.option)
    .bind('e1', filterPrismicElement(element1))
    .bind('e2', filterPrismicElement(element2))
    .return(({ e1, e2 }) => onSome(e1, e2));

  return pipe(result, O.getOrElse(onNoneFunction));
}

export function isPrismicElementNotEmpty(element: PrismicElement): boolean {
  return O.isSome(filterPrismicElement(element));
}

export function renderPrismicSlice<T extends PrismicSlice>(
  content: DefaultPrismicContent,
  sliceType: string,
  f: (slice: T) => ReactNode,
): ReactNode {
  return pipe(
    O.fromNullable(content.body),
    O.chain(body =>
      pipe(
        body,
        A.findFirst(slice => slice.slice_type === sliceType),
      ),
    ),
    O.map(a => f(a as T)),
    O.toNullable,
  );
}

export function renderPrismicSlices<T extends PrismicSlice>(
  content: DefaultPrismicContent,
  sliceType: string,
  f: (slice: T, index: number) => ReactNode,
): Array<ReactNode> | null {
  return pipe(
    O.fromNullable(content.body),
    O.map(body => body.filter(slice => slice.slice_type === sliceType).map((slice, i) => f(slice as T, i))),
    O.toNullable,
  );
}

export function getSeoElements(document: PrismicDocument<DefaultPrismicContent>): PageSeoProps {
  const { data } = document;

  return {
    title: pipe(O.fromNullable(data.meta_title), O.toUndefined),
    description: pipe(O.fromNullable(data.meta_description), O.toUndefined),
  };
}

export function getLinkPropsFromPrismicLink(link: PrismicLink): Omit<CustomLinkProps, 'ref' | 'as'> {
  return pipe(
    filterPrismicElement(link),
    O.fold<PrismicLink, HTMLProps<HTMLAnchorElement>>(
      () => ({}),
      l => {
        if (l.link_type === 'Document') {
          return getCustomLinkPropsFromPrismicDocument(l);
        } else {
          const target = l.link_type === 'Media' ? '_blank' : l.target;

          return {
            target: target,
            rel: target === '_blank' ? 'noopener noreferrer' : undefined,
            href: l.url,
          };
        }
      },
    ),
  );
}

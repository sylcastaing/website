import { PrismicDocument, PrismicPageType } from './model';
import { RouteKey } from '../../routes';

import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { CustomLinkProps } from '../../shared/components/link/CustomLink';
import { getLinkFromLinkProps } from '../../shared/utils/routes';

type PageHyperLinkResolver = RouteKey | CustomLinkProps | ((doc: PrismicDocument) => RouteKey | CustomLinkProps);

export const hyperLinkRelations: { [key in PrismicPageType]: PageHyperLinkResolver } = {
  home: 'home',
};

function hyperLinkResolverToCustomLinkProps(
  resolver: PageHyperLinkResolver,
  document: PrismicDocument,
): CustomLinkProps {
  if (typeof resolver === 'string') {
    return { to: resolver };
  } else if (typeof resolver === 'function') {
    return hyperLinkResolverToCustomLinkProps(resolver(document), document);
  } else {
    return resolver;
  }
}

export function getCustomLinkPropsFromPrismicDocument(document: PrismicDocument): Omit<CustomLinkProps, 'ref' | 'as'> {
  const type = document.type as PrismicPageType;

  return pipe(
    O.fromNullable(hyperLinkRelations[type]),
    O.fold<PageHyperLinkResolver, CustomLinkProps>(
      () => ({ to: 'home' }),
      resolver => hyperLinkResolverToCustomLinkProps(resolver, document),
    ),
  );
}

export function defaultLinkResolver(doc: PrismicDocument): string {
  return pipe(
    getLinkFromLinkProps(getCustomLinkPropsFromPrismicDocument(doc)),
    O.getOrElse(() => '/'),
  );
}

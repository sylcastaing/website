import { NextRouter } from 'next/router';

import routes, { Route, RouteKey, RouteParams, getLink, getPage } from '../../routes';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { CustomLinkProps } from '../components/link/CustomLink';

export function getLinkFromLinkProps({ to, params, queries, hash }: CustomLinkProps): O.Option<string> {
  return pipe(
    O.fromNullable(to),
    O.map(to => routes[to]),
    O.map(route => route.path),
    O.map(path => getLink(path, params, queries, hash)),
  );
}

export function navigateToRoute(
  router: NextRouter,
  route: Route,
  params: RouteParams = {},
  queries: RouteParams = {},
): Promise<boolean> {
  return router.push(getPage(route.page, params, queries), getLink(route.path, params, queries));
}

export function navigateTo(
  router: NextRouter,
  key: RouteKey,
  params: RouteParams = {},
  queries: RouteParams = {},
): Promise<boolean> {
  return navigateToRoute(router, routes[key], params, queries).then(res => {
    window.scrollTo(0, 0);

    return res;
  });
}

import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import queryString from 'querystring';

export interface Route {
  path: string;
  page: string;
}

export type RouteKey = 'home';

export type RouteParams = { [key: string]: string | number | undefined };

const routes: { [key in RouteKey]: Route } = {
  home: {
    path: '/',
    page: '/',
  },
};

export function getRoute(key: RouteKey) {
  return routes[key];
}

function parseQueries(queries: RouteParams = {}): O.Option<string> {
  return pipe(
    O.fromNullable(queryString.stringify(queries)),
    O.chain(q => (q !== '' ? O.some(q) : O.none)),
  );
}

export function getPage(page: string, params: RouteParams = {}, queries: RouteParams = {}): string {
  const parsedParams = parseQueries(params);
  const parsedQueries = parseQueries(queries);

  return `${page}${O.fold(
    () => '',
    q => `?${q}`,
  )(parsedParams)}${O.fold(
    () => '',
    q => `${O.isSome(parsedParams) ? '&' : '?'}${q}`,
  )(parsedQueries)}`;
}

export function getLink(path: string, params: RouteParams = {}, queries: RouteParams = {}, hash?: string): string {
  const withParams = Object.keys(params).reduce(
    (acc, curr) => acc.replace(`:${curr}`, (params[curr] || '').toString()),
    path,
  );

  return `${withParams}${hash ? `#${hash}` : ''}${O.fold(
    () => '',
    q => `?${q}`,
  )(parseQueries(queries))}`;
}

export default routes;

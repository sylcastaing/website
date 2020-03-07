import React, { FC, HTMLProps, memo, useMemo } from 'react';

import Link from 'next/link';

import { getLink, getPage, getRoute, Route, RouteKey, RouteParams } from '../../../routes';

import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

import { useRouter } from 'next/router';

function compareLink(routerLink: string, link?: string, strict?: boolean): boolean {
  if (!link) {
    return false;
  }

  if (link === '/' || strict) {
    return routerLink === link;
  } else {
    return routerLink.includes(link);
  }
}

export interface CustomLinkProps extends Omit<HTMLProps<HTMLAnchorElement>, 'as'> {
  to?: RouteKey;
  params?: RouteParams;
  queries?: RouteParams;
  hash?: string;
  activeClassName?: string;
  strict?: boolean;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

const CustomLink: FC<CustomLinkProps> = ({
  to,
  params,
  queries,
  hash,
  href,
  activeClassName,
  strict,
  className,
  children,
  ...linkProps
}) => {
  const router = useRouter();

  const route: O.Option<Route> = useMemo(() => pipe(O.fromNullable(to), O.map(getRoute)), [to]);

  const page: O.Option<string> = useMemo(
    () =>
      pipe(
        route,
        O.map(r => getPage(r.page, params, queries)),
      ),
    [route, params, queries],
  );

  const link: string | undefined = useMemo(
    () =>
      pipe(
        route,
        O.map(r => getLink(r.path, params, queries, hash)),
        O.toUndefined,
      ),
    [route, params, queries, hash],
  );

  const linkClassName = useMemo(
    () =>
      pipe(
        O.fromNullable(activeClassName),
        O.filter(() => compareLink(router.asPath, link, strict)),
        O.fold(
          () => className,
          cl => `${cl} ${className ? className : ''}`,
        ),
      ),
    [activeClassName, className, router, link, strict],
  );

  return pipe(
    page,
    O.fold(
      () => (
        <a href={href} {...linkProps} className={linkClassName}>
          {children}
        </a>
      ),
      p => (
        <Link href={p} as={link}>
          <a {...linkProps} className={linkClassName}>
            {children}
          </a>
        </Link>
      ),
    ),
  );
};

export default memo(CustomLink);

import React, { FC, memo, ReactNode } from 'react';

import * as O from 'fp-ts/lib/Option';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import Head from 'next/head';
import { CustomLinkProps } from '../../shared/components/link/CustomLink';
import { getLinkFromLinkProps } from '../../shared/utils/routes';
import { getPublicRuntimeConfigValue } from '../../shared/utils/config';
import { RouteKey } from '../../routes';

const TITLE_SUFFIX = 'Sylvain Castaing';

function getMetaLinkFromLinkProps(type: 'canonical' | 'prev' | 'next', params?: RouteKey | CustomLinkProps): ReactNode {
  return pipe(
    O.fromNullable(params),
    O.map(p => (typeof p === 'string' ? { to: p } : p)),
    O.chain(props => A.array.sequence(O.option)([getPublicRuntimeConfigValue('HOST'), getLinkFromLinkProps(props)])),
    O.map(([host, link]) => <link rel={type} href={`${host}${link}`} />),
    O.toNullable,
  );
}

export interface PageSeoProps {
  title?: string;
  description?: string;
  canonical?: RouteKey | CustomLinkProps;
  prev?: RouteKey | CustomLinkProps;
  next?: RouteKey | CustomLinkProps;
}

const PageSeo: FC<PageSeoProps> = ({ title, description, canonical, prev, next }) => {
  return (
    <Head>
      {pipe(
        O.fromNullable(title),
        O.map(t => <title>{` ${t} - ${TITLE_SUFFIX}`}</title>),
        O.toNullable,
      )}
      {pipe(
        O.fromNullable(description),
        O.map(d => <meta name="description" content={d} />),
        O.toNullable,
      )}
      {getMetaLinkFromLinkProps('canonical', canonical)}
      {getMetaLinkFromLinkProps('prev', prev)}
      {getMetaLinkFromLinkProps('next', next)}
    </Head>
  );
};

export default memo(PageSeo);

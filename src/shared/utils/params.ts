import { NextPageContext } from 'next';

import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

export function getParam(ctx: NextPageContext, key: string): O.Option<string | string[]> {
  return O.fromNullable(ctx.query[key]);
}

export function getSingleParam(ctx: NextPageContext, key: string): O.Option<string> {
  return pipe(
    getParam(ctx, key),
    O.mapNullable(param => (Array.isArray(param) ? param[0] : param)),
  );
}

export function getSingleNumberParam(ctx: NextPageContext, key: string): O.Option<number> {
  return pipe(
    getSingleParam(ctx, key),
    O.map(param => parseInt(param, 10)),
    O.filter(param => !isNaN(param)),
  );
}

export function getUidParam(ctx: NextPageContext): O.Option<string> {
  return getSingleParam(ctx, 'uid');
}

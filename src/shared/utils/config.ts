import getConfig from 'next/config';

import * as O from 'fp-ts/lib/Option';

export const getServerRuntimeConfig = (): { [key: string]: string } => getConfig().serverRuntimeConfig;
export const getPublicRuntimeConfig = (): { [key: string]: string } => getConfig().publicRuntimeConfig;

export const getServerRuntimeConfigValue = (key: string): O.Option<string> =>
  O.fromNullable(getServerRuntimeConfig()[key]);

export const getPublicRuntimeConfigValue = (key: string): O.Option<string> =>
  O.fromNullable(getPublicRuntimeConfig()[key]);

import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { array } from 'fp-ts/lib/Array';
import dotenv from 'dotenv';

export const isDev = (): boolean => process.env.NODE_ENV !== 'production';

dotenv.config({ path: '.env' });

if (isDev()) {
  dotenv.config({ path: '.env.local' });
}

export enum Environment {
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export function getConfig(key: string): O.Option<string> {
  return pipe(
    O.fromNullable(process.env[key]),
    O.filter(value => value !== ''),
  );
}

function getNumberConfig(key: string): O.Option<number> {
  return pipe(
    getConfig(key),
    O.map(val => parseInt(val, 10)),
    O.filter(val => !isNaN(val)),
  );
}

export function getPort(): number {
  return pipe(
    getNumberConfig('PORT'),
    O.getOrElse(() => 4000),
  );
}

export function getEnvironment(): Environment {
  return pipe(
    getConfig('ENVIRONMENT'),
    O.filter(environment => Object.values(Environment).includes(environment as Environment)),
    O.map(environment => environment as Environment),
    O.getOrElse<Environment>(() => Environment.STAGING),
  );
}

export function getConfigs(...list: Array<string>): O.Option<Array<string>> {
  return array.sequence(O.option)(list.map(l => getConfig(l)));
}

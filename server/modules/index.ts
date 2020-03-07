import { Express } from 'express';

import Server from 'next/dist/next-server/server/next-server';

import * as IO from 'fp-ts/lib/IO';

import { Environment } from '../utils/config';

import registerStatics from './statics';
import registerCompression from './compression';
import registerRouter from './router';
import registerHealth from './health';
import { array } from 'fp-ts/lib/Array';

export type Module = (server: Express, app: Server, isDev: boolean, environment: Environment) => IO.IO<void>;

const modules: ReadonlyArray<Module> = [registerStatics, registerCompression, registerRouter, registerHealth];

const registerModules: Module = (server, app, isDev, environment) => {
  return array.sequence(IO.io)(modules.map(m => m(server, app, isDev, environment)));
};

export default registerModules;

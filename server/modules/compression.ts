import { Module } from './index';

import compression from 'compression';

const registerCompression: Module = (server, app, isDev) => () => {
  if (!isDev) {
    server.use(compression());
  }
};

export default registerCompression;

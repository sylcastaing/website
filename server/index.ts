import express from 'express';
import next from 'next';

import { getEnvironment, getPort, isDev } from './utils/config';
import { log } from './utils/logger';

import registerModules from './modules';

const dev = isDev();

log(`Running app in ${dev ? 'dev' : 'production'} mode`);

const server = express();

server.disable('x-powered-by');

const app = next({
  dir: './src',
  dev,
});

const handle = app.getRequestHandler();

const port = getPort();

const environment = getEnvironment();

app
  .prepare()
  .then(() => {
    registerModules(server, app, dev, environment)();

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) throw err;

      log(`Server listen on port ${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

global.process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

global.process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

global.process.on('SIGINT', () => process.exit());
global.process.on('SIGTERM', () => process.exit());

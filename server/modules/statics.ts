import { Module } from './index';
import * as path from 'path';

import { RequestHandler } from 'express';
import { Environment } from '../utils/config';

const statics: ReadonlyArray<string> = [
  '/favicon.ico',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/apple-touch-icon.png',
];

const staticsOptions = {
  root: path.join(__dirname, '../../src/public/static'),
};

const handleWithCacheControl: RequestHandler = (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=31536000, immutable');
  next();
};

const robotTxtFiles: { [key in Environment]: string } = {
  [Environment.STAGING]: '/robot.staging.txt',
  [Environment.PRODUCTION]: '/robot.production.txt',
};

const registerStatics: Module = (server, app, isDev, environment) => () => {
  if (!isDev) {
    server.use('/_next/static/images', handleWithCacheControl);
    server.get(/.*\.css$/, handleWithCacheControl);
  }

  statics.forEach(path => {
    server.get(path, (req, res) => res.sendFile(path, staticsOptions));
  });

  const robotTxtFile = robotTxtFiles[environment];

  server.get('/robot.txt', (req, res) => res.sendFile(robotTxtFile, staticsOptions));
};

export default registerStatics;

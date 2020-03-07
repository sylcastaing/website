import { Module } from './index';

import { log } from '../utils/logger';

import routes from '../../src/routes';

const registerRouter: Module = (server, app) => () => {
  Object.values(routes).forEach(({ path, page }) => {
    server.get(path, (req, res) => app.render(req, res, page, { ...req.params, ...req.query }));
  });

  server.get('/preview', (req, res) => app.render(req, res, '/preview', { ...req.params, ...req.query }));

  logRoutes();
};

const logRoutes = () => {
  const r = Object.values(routes);

  log(`${r.length} routes loaded`);
};

export default registerRouter;

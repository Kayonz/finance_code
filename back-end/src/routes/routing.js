import apiRouting from './api/routing.js';

const routes = (app) => {
  app.use('/api', apiRouting);
};

export default routes;
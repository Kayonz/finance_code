import routing from './routing.js';

const routes = (app) => {
  app.use('/', routing);
};

export default routes;
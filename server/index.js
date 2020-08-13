import Fastify from 'fastify';
import Rollbar from 'rollbar';
import path from 'path';
import dotenv from 'dotenv';
import Pug from 'pug';
import fastifyStatic from 'fastify-static';
import fastifyFormbody from 'fastify-formbody';
import fastifyObjection from 'fastify-objectionjs';
import pointOfView from 'point-of-view';
import models from './models';

import knexConfig from '../knexfile.js';
import routes from './routes/index.js';

dotenv.config();

const rollbar = new Rollbar({
  accessToken: process.env.POST_SERVER_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

//  app.use(rollbar.errorHandler());

rollbar.log('Hello world!');

const setUpViews = (app) => {
  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    defaultContext: {
      assetPath: (filename) => `/assets/${filename}`,
    },
  });
};

const setUpAssets = (app) => {
  app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'),
    prefix: '/assets/',
  });
};

const app = new Fastify({
  logger: true,
});

const registerPlugins = (app) => {
  app.register(fastifyFormbody);
  setUpViews(app);
  setUpAssets(app);
  app.register(fastifyObjection, {
    knexConfig: knexConfig.development,
    models,
  });
  app.register(routes);
};

registerPlugins(app);

app.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});

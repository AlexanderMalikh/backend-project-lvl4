import Fastify from 'fastify';
import Rollbar from 'rollbar';
import path from 'path';
import dotenv from 'dotenv';
import Pug from 'pug';
import fastifyStatic from 'fastify-static';
import fastifyFormbody from 'fastify-formbody';
import fastifyObjection from 'fastify-objectionjs';
import fastifyFlash from 'fastify-flash';
import fastifyErrorPage from 'fastify-error-page';
import fastifySecureSession from 'fastify-secure-session';
import fastifyMethodOverride from 'fastify-method-override';
import pointOfView from 'point-of-view';
import i18next from 'i18next';
import models from './models';
import ru from './locales/ru.js';

import knexConfig from '../knexfile.js';
import routes from './routes/index.js';
import getHelpers from './helpers/index.js';

dotenv.config();

const rollbar = new Rollbar({
  accessToken: process.env.POST_SERVER_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

//  app.use(rollbar.errorHandler());
const privateRoutes = ['/tags', '/tasks', '/tags', '/labels/new', '/statuses/new'];

rollbar.log('Hello world!');

const setUpViews = (app) => {
  const helpers = getHelpers(app);
  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    defaultContext: {
      ...helpers,
      assetPath: (filename) => `/assets/${filename}`,
    },
    templates: path.join(__dirname, '..', 'server', 'views'),
  });
  app.decorateReply('render', function render(viewPath, locals) {
    this.view(viewPath, { ...locals, reply: this });
  });
};

const setupLocalization = () => {
  i18next
    .init({
      lng: 'ru',
      fallbackLng: 'en',
      debug: false,
      resources: {
        ru,
      },
    });
};

const setUpAssets = (app) => {
  app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'),
    prefix: '/assets/',
  });
};

const addHooks = (app) => {
  app.decorateRequest('currentUser', null);
  app.decorateRequest('signedIn', false);

  app.addHook('preHandler', async (req, reply) => {
    const userId = req.session.get('userId');
    if (userId) {
      req.currentUser = await app.objection.models.user.query().findById(userId);
      req.signedIn = true;
    }
    if (privateRoutes.find((r) => r === req.url) && !userId) {
      req.flash('danger', 'Нет доступа! Авторизуйтесь');
      reply.redirect('/');
    }
  });
};

const app = new Fastify({
  logger: true,
});

const registerPlugins = (app) => {
  app.register(fastifyErrorPage);
  app.register(fastifyFormbody);
  setUpViews(app);
  setUpAssets(app);
  app.register(fastifyObjection, {
    knexConfig: knexConfig.development,
    models,
  });
  app.register(fastifySecureSession, {
    secret: 'qwertyuiopasdfghjklzxcnmmmzxasjhdklasjkdlawqi',
    cookie: {
      path: '/',
    },
  });
  app.register(fastifyMethodOverride);
  app.register(fastifyFlash);
  routes(app);
  addHooks(app);
};

registerPlugins(app);
setupLocalization();

app.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});

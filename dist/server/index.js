"use strict";

var _fastify = _interopRequireDefault(require("fastify"));

var _rollbar = _interopRequireDefault(require("rollbar"));

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pug = _interopRequireDefault(require("pug"));

var _fastifyStatic = _interopRequireDefault(require("fastify-static"));

var _fastifyFormbody = _interopRequireDefault(require("fastify-formbody"));

var _fastifyObjectionjs = _interopRequireDefault(require("fastify-objectionjs"));

var _fastifyFlash = _interopRequireDefault(require("fastify-flash"));

var _fastifyErrorPage = _interopRequireDefault(require("fastify-error-page"));

var _fastifySecureSession = _interopRequireDefault(require("fastify-secure-session"));

var _fastifyMethodOverride = _interopRequireDefault(require("fastify-method-override"));

var _pointOfView = _interopRequireDefault(require("point-of-view"));

var _models = _interopRequireDefault(require("./models"));

var _knexfile = _interopRequireDefault(require("../knexfile.js"));

var _index = _interopRequireDefault(require("./routes/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const rollbar = new _rollbar.default({
  accessToken: process.env.POST_SERVER_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
}); //  app.use(rollbar.errorHandler());

const privateRoutes = ['/labels', '/tasks', '/statuses', 'labels/new', '/statuses/new'];
rollbar.log('Hello world!');

const setUpViews = app => {
  app.register(_pointOfView.default, {
    engine: {
      pug: _pug.default
    },
    includeViewExtension: true,
    defaultContext: {
      assetPath: filename => `/assets/${filename}`
    }
  });
  app.decorateReply('render', function render(viewPath, locals) {
    this.view(viewPath, { ...locals,
      reply: this
    });
  });
};

const setUpAssets = app => {
  app.register(_fastifyStatic.default, {
    root: _path.default.join(__dirname, '..', 'public'),
    prefix: '/assets/'
  });
};

const addHooks = app => {
  app.decorateRequest('currentUser', null);
  app.decorateRequest('signedIn', false);
  app.addHook('preHandler', async (req, reply) => {
    const userId = req.session.get('userId');

    if (userId) {
      req.currentUser = await app.objection.models.user.query().findById(userId);
      req.signedIn = true;
    }

    if (privateRoutes.find(r => r === req.url) && !userId) {
      req.flash('danger', 'Нет доступа! Авторизуйтесь');
      reply.redirect('/');
    }
  });
};

const app = new _fastify.default({
  logger: true
});

const registerPlugins = app => {
  app.register(_fastifyErrorPage.default);
  app.register(_fastifyFormbody.default);
  setUpViews(app);
  setUpAssets(app);
  app.register(_fastifyObjectionjs.default, {
    knexConfig: _knexfile.default.development,
    models: _models.default
  });
  app.register(_fastifySecureSession.default, {
    secret: 'qwertyuiopasdfghjklzxcnmmmzxasjhdklasjkdlawqi',
    cookie: {
      path: '/'
    }
  });
  app.register(_fastifyMethodOverride.default);
  app.register(_fastifyFlash.default);
  (0, _index.default)(app);
  addHooks(app);
};

registerPlugins(app);
app.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.log.info(`server listening on ${address}`);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb3RlbnYiLCJjb25maWciLCJyb2xsYmFyIiwiUm9sbGJhciIsImFjY2Vzc1Rva2VuIiwicHJvY2VzcyIsImVudiIsIlBPU1RfU0VSVkVSX0lURU1fQUNDRVNTX1RPS0VOIiwiY2FwdHVyZVVuY2F1Z2h0IiwiY2FwdHVyZVVuaGFuZGxlZFJlamVjdGlvbnMiLCJwcml2YXRlUm91dGVzIiwibG9nIiwic2V0VXBWaWV3cyIsImFwcCIsInJlZ2lzdGVyIiwicG9pbnRPZlZpZXciLCJlbmdpbmUiLCJwdWciLCJQdWciLCJpbmNsdWRlVmlld0V4dGVuc2lvbiIsImRlZmF1bHRDb250ZXh0IiwiYXNzZXRQYXRoIiwiZmlsZW5hbWUiLCJkZWNvcmF0ZVJlcGx5IiwicmVuZGVyIiwidmlld1BhdGgiLCJsb2NhbHMiLCJ2aWV3IiwicmVwbHkiLCJzZXRVcEFzc2V0cyIsImZhc3RpZnlTdGF0aWMiLCJyb290IiwicGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJwcmVmaXgiLCJhZGRIb29rcyIsImRlY29yYXRlUmVxdWVzdCIsImFkZEhvb2siLCJyZXEiLCJ1c2VySWQiLCJzZXNzaW9uIiwiZ2V0IiwiY3VycmVudFVzZXIiLCJvYmplY3Rpb24iLCJtb2RlbHMiLCJ1c2VyIiwicXVlcnkiLCJmaW5kQnlJZCIsInNpZ25lZEluIiwiZmluZCIsInIiLCJ1cmwiLCJmbGFzaCIsInJlZGlyZWN0IiwiRmFzdGlmeSIsImxvZ2dlciIsInJlZ2lzdGVyUGx1Z2lucyIsImZhc3RpZnlFcnJvclBhZ2UiLCJmYXN0aWZ5Rm9ybWJvZHkiLCJmYXN0aWZ5T2JqZWN0aW9uIiwia25leENvbmZpZyIsImRldmVsb3BtZW50IiwiZmFzdGlmeVNlY3VyZVNlc3Npb24iLCJzZWNyZXQiLCJjb29raWUiLCJmYXN0aWZ5TWV0aG9kT3ZlcnJpZGUiLCJmYXN0aWZ5Rmxhc2giLCJsaXN0ZW4iLCJQT1JUIiwiZXJyIiwiYWRkcmVzcyIsImVy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QUFhLENBQWI7QUFDRDs7QUFDRDVELEVBQUFBLEdBQUcsQ0FBQ0YsR0FBSixDQUFRK0QsSUFBUixDQUFjLHVCQUFzQkgsT0FBUSxFQUE1QztBQUNELENBTkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmFzdGlmeSBmcm9tICdmYXN0aWZ5JztcbmltcG9ydCBSb2xsYmFyIGZyb20gJ3JvbGxiYXInO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgUHVnIGZyb20gJ3B1Zyc7XG5pbXBvcnQgZmFzdGlmeVN0YXRpYyBmcm9tICdmYXN0aWZ5LXN0YXRpYyc7XG5pbXBvcnQgZmFzdGlmeUZvcm1ib2R5IGZyb20gJ2Zhc3RpZnktZm9ybWJvZHknO1xuaW1wb3J0IGZhc3RpZnlPYmplY3Rpb24gZnJvbSAnZmFzdGlmeS1vYmplY3Rpb25qcyc7XG5pbXBvcnQgZmFzdGlmeUZsYXNoIGZyb20gJ2Zhc3RpZnktZmxhc2gnO1xuaW1wb3J0IGZhc3RpZnlFcnJvclBhZ2UgZnJvbSAnZmFzdGlmeS1lcnJvci1wYWdlJztcbmltcG9ydCBmYXN0aWZ5U2VjdXJlU2Vzc2lvbiBmcm9tICdmYXN0aWZ5LXNlY3VyZS1zZXNzaW9uJztcbmltcG9ydCBmYXN0aWZ5TWV0aG9kT3ZlcnJpZGUgZnJvbSAnZmFzdGlmeS1tZXRob2Qtb3ZlcnJpZGUnO1xuaW1wb3J0IHBvaW50T2ZWaWV3IGZyb20gJ3BvaW50LW9mLXZpZXcnO1xuaW1wb3J0IG1vZGVscyBmcm9tICcuL21vZGVscyc7XG5cbmltcG9ydCBrbmV4Q29uZmlnIGZyb20gJy4uL2tuZXhmaWxlLmpzJztcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMvaW5kZXguanMnO1xuXG5kb3RlbnYuY29uZmlnKCk7XG5cbmNvbnN0IHJvbGxiYXIgPSBuZXcgUm9sbGJhcih7XG4gIGFjY2Vzc1Rva2VuOiBwcm9jZXNzLmVudi5QT1NUX1NFUlZFUl9JVEVNX0FDQ0VTU19UT0tFTixcbiAgY2FwdHVyZVVuY2F1Z2h0OiB0cnVlLFxuICBjYXB0dXJlVW5oYW5kbGVkUmVqZWN0aW9uczogdHJ1ZSxcbn0pO1xuXG4vLyAgYXBwLnVzZShyb2xsYmFyLmVycm9ySGFuZGxlcigpKTtcbmNvbnN0IHByaXZhdGVSb3V0ZXMgPSBbJy9sYWJlbHMnLCAnL3Rhc2tzJywgJy9zdGF0dXNlcycsICdsYWJlbHMvbmV3JywgJy9zdGF0dXNlcy9uZXcnXTtcblxucm9sbGJhci5sb2coJ0hlbGxvIHdvcmxkIScpO1xuXG5jb25zdCBzZXRVcFZpZXdzID0gKGFwcCkgPT4ge1xuICBhcHAucmVnaXN0ZXIocG9pbnRPZlZpZXcsIHtcbiAgICBlbmdpbmU6IHtcbiAgICAgIHB1ZzogUHVnLFxuICAgIH0sXG4gICAgaW5jbHVkZVZpZXdFeHRlbnNpb246IHRydWUsXG4gICAgZGVmYXVsdENvbnRleHQ6IHtcbiAgICAgIGFzc2V0UGF0aDogKGZpbGVuYW1lKSA9PiBgL2Fzc2V0cy8ke2ZpbGVuYW1lfWAsXG4gICAgfSxcbiAgfSk7XG4gIGFwcC5kZWNvcmF0ZVJlcGx5KCdyZW5kZXInLCBmdW5jdGlvbiByZW5kZXIodmlld1BhdGgsIGxvY2Fscykge1xuICAgIHRoaXMudmlldyh2aWV3UGF0aCwgeyAuLi5sb2NhbHMsIHJlcGx5OiB0aGlzIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IHNldFVwQXNzZXRzID0gKGFwcCkgPT4ge1xuICBhcHAucmVnaXN0ZXIoZmFzdGlmeVN0YXRpYywge1xuICAgIHJvb3Q6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdwdWJsaWMnKSxcbiAgICBwcmVmaXg6ICcvYXNzZXRzLycsXG4gIH0pO1xufTtcblxuY29uc3QgYWRkSG9va3MgPSAoYXBwKSA9PiB7XG4gIGFwcC5kZWNvcmF0ZVJlcXVlc3QoJ2N1cnJlbnRVc2VyJywgbnVsbCk7XG4gIGFwcC5kZWNvcmF0ZVJlcXVlc3QoJ3NpZ25lZEluJywgZmFsc2UpO1xuXG4gIGFwcC5hZGRIb29rKCdwcmVIYW5kbGVyJywgYXN5bmMgKHJlcSwgcmVwbHkpID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSByZXEuc2Vzc2lvbi5nZXQoJ3VzZXJJZCcpO1xuICAgIGlmICh1c2VySWQpIHtcbiAgICAgIHJlcS5jdXJyZW50VXNlciA9IGF3YWl0IGFwcC5vYmplY3Rpb24ubW9kZWxzLnVzZXIucXVlcnkoKS5maW5kQnlJZCh1c2VySWQpO1xuICAgICAgcmVxLnNpZ25lZEluID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHByaXZhdGVSb3V0ZXMuZmluZCgocikgPT4gciA9PT0gcmVxLnVybCkgJiYgIXVzZXJJZCkge1xuICAgICAgcmVxLmZsYXNoKCdkYW5nZXInLCAn0J3QtdGCINC00L7RgdGC0YPQv9CwISDQkNCy0YLQvtGA0LjQt9GD0LnRgtC10YHRjCcpO1xuICAgICAgcmVwbHkucmVkaXJlY3QoJy8nKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgYXBwID0gbmV3IEZhc3RpZnkoe1xuICBsb2dnZXI6IHRydWUsXG59KTtcblxuY29uc3QgcmVnaXN0ZXJQbHVnaW5zID0gKGFwcCkgPT4ge1xuICBhcHAucmVnaXN0ZXIoZmFzdGlmeUVycm9yUGFnZSk7XG4gIGFwcC5yZWdpc3RlcihmYXN0aWZ5Rm9ybWJvZHkpO1xuICBzZXRVcFZpZXdzKGFwcCk7XG4gIHNldFVwQXNzZXRzKGFwcCk7XG4gIGFwcC5yZWdpc3RlcihmYXN0aWZ5T2JqZWN0aW9uLCB7XG4gICAga25leENvbmZpZzoga25leENvbmZpZy5kZXZlbG9wbWVudCxcbiAgICBtb2RlbHMsXG4gIH0pO1xuICBhcHAucmVnaXN0ZXIoZmFzdGlmeVNlY3VyZVNlc3Npb24sIHtcbiAgICBzZWNyZXQ6ICdxd2VydHl1aW9wYXNkZmdoamtsenhjbm1tbXp4YXNqaGRrbGFzamtkbGF3cWknLFxuICAgIGNvb2tpZToge1xuICAgICAgcGF0aDogJy8nLFxuICAgIH0sXG4gIH0pO1xuICBhcHAucmVnaXN0ZXIoZmFzdGlmeU1ldGhvZE92ZXJyaWRlKTtcbiAgYXBwLnJlZ2lzdGVyKGZhc3RpZnlGbGFzaCk7XG4gIHJvdXRlcyhhcHApO1xuICBhZGRIb29rcyhhcHApO1xufTtcblxucmVnaXN0ZXJQbHVnaW5zKGFwcCk7XG5cbmFwcC5saXN0ZW4ocHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwLCAnMC4wLjAuMCcsIChlcnIsIGFkZHJlc3MpID0+IHtcbiAgaWYgKGVycikge1xuICAgIGFwcC5sb2cuZXJyb3IoZXJyKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG4gIH1cbiAgYXBwLmxvZy5pbmZvKGBzZXJ2ZXIgbGlzdGVuaW5nIG9uICR7YWRkcmVzc31gKTtcbn0pO1xuIl19
"use strict";

var _fastify = _interopRequireWildcard(require("fastify"));

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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_dotenv.default.config();

const rollbar = new _rollbar.default({
  accessToken: process.env.POST_SERVER_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
}); //  app.use(rollbar.errorHandler());

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
  app.decorateReply('render', function render(viewPath) {
    this.view(viewPath, {
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
  app.addHook('preHandler', async req => {
    const userId = req.session.get('userId');

    if (userId) {
      req.currentUser = await app.objection.models.user.query().findById(userId);
      req.signedIn = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb3RlbnYiLCJjb25maWciLCJyb2xsYmFyIiwiUm9sbGJhciIsImFjY2Vzc1Rva2VuIiwicHJvY2VzcyIsImVudiIsIlBPU1RfU0VSVkVSX0lURU1fQUNDRVNTX1RPS0VOIiwiY2FwdHVyZVVuY2F1Z2h0IiwiY2FwdHVyZVVuaGFuZGxlZFJlamVjdGlvbnMiLCJsb2ciLCJzZXRVcFZpZXdzIiwiYXBwIiwicmVnaXN0ZXIiLCJwb2ludE9mVmlldyIsImVuZ2luZSIsInB1ZyIsIlB1ZyIsImluY2x1ZGVWaWV3RXh0ZW5zaW9uIiwiZGVmYXVsdENvbnRleHQiLCJhc3NldFBhdGgiLCJmaWxlbmFtZSIsImRlY29yYXRlUmVwbHkiLCJyZW5kZXIiLCJ2aWV3UGF0aCIsInZpZXciLCJyZXBseSIsInNldFVwQXNzZXRzIiwiZmFzdGlmeVN0YXRpYyIsInJvb3QiLCJwYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsInByZWZpeCIsImFkZEhvb2tzIiwiZGVjb3JhdGVSZXF1ZXN0IiwiYWRkSG9vayIsInJlcSIsInVzZXJJZCIsInNlc3Npb24iLCJnZXQiLCJjdXJyZW50VXNlciIsIm9iamVjdGlvbiIsIm1vZGVscyIsInVzZXIiLCJxdWVyeSIsImZpbmRCeUlkIiwic2lnbmVkSW4iLCJGYXN0aWZ5IiwibG9nZ2VyIiwicmVnaXN0ZXJQbHVnaW5zIiwiZmFzdGlmeUVycm9yUGFnZSIsImZhc3RpZnlGb3JtYm9keSIsImZhc3RpZnlPYmplY3Rpb24iLCJrbmV4Q29uZmlnIiwiZGV2ZWxvcG1lbnQiLCJmYXN0aWZ5U2VjdXJlU2Vzc2lvbiIsInNlY3JldCIsImNvb2tpZSIsImZhc3RpZnlNZXRob2RPdmVycmlkZSIsImZhc3RpZnlGbGFzaCIsImxpc3RlbiIsIlBPUlQiLCJlcnIiLCJhZGRyZXNzIiwiZXJyb3IiLCJleGl0IiwiaW5mbyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFD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QUosQ0FBYTJDLDZCQUFiLEVBQW1DO0FBQ2pDQyxJQUFBQSxNQUFNLEVBQUUsK0NBRHlCO0FBRWpDQyxJQUFBQSxNQUFNLEVBQUU7QUFDTjVCLE1BQUFBLElBQUksRUFBRTtBQURBO0FBRnlCLEdBQW5DO0FBTUFsQixFQUFBQSxHQUFHLENBQUNDLFFBQUosQ0FBYThDLDhCQUFiO0FBQ0EvQyxFQUFBQSxHQUFHLENBQUNDLFFBQUosQ0FBYStDLHFCQUFiO0FBQ0Esc0JBQU9oRCxHQUFQO0FBQ0FzQixFQUFBQSxRQUFRLENBQUN0QixHQUFELENBQVI7QUFDRCxDQW5CRDs7QUFxQkFzQyxlQUFlLENBQUN0QyxHQUFELENBQWY7QUFFQUEsR0FBRyxDQUFDaUQsTUFBSixDQUFXeEQsT0FBTyxDQUFDQyxHQUFSLENBQVl3RCxJQUFaLElBQW9CLElBQS9CLEVBQXFDLFNBQXJDLEVBQWdELENBQUNDLEdBQUQsRUFBTUMsT0FBTixLQUFrQjtBQUNoRSxNQUFJRCxHQUFKLEVBQVM7QUFDUG5ELElBQUFBLEdBQUcsQ0FBQ0YsR0FBSixDQUFRdUQsS0FBUixDQUFjRixHQUFkO0FBQ0ExRCxJQUFBQSxPQUFPLENBQUM2RCxJQUFSLENBQWEsQ0FBYjtBQUNEOztBQUNEdEQsRUFBQUEsR0FBRyxDQUFDRixHQUFKLENBQVF5RCxJQUFSLENBQWMsdUJBQXNCSCxPQUFRLEVBQTVDO0FBQ0QsQ0FORCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGYXN0aWZ5LCB7IGZhc3RpZnkgfSBmcm9tICdmYXN0aWZ5JztcbmltcG9ydCBSb2xsYmFyIGZyb20gJ3JvbGxiYXInO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgUHVnIGZyb20gJ3B1Zyc7XG5pbXBvcnQgZmFzdGlmeVN0YXRpYyBmcm9tICdmYXN0aWZ5LXN0YXRpYyc7XG5pbXBvcnQgZmFzdGlmeUZvcm1ib2R5IGZyb20gJ2Zhc3RpZnktZm9ybWJvZHknO1xuaW1wb3J0IGZhc3RpZnlPYmplY3Rpb24gZnJvbSAnZmFzdGlmeS1vYmplY3Rpb25qcyc7XG5pbXBvcnQgZmFzdGlmeUZsYXNoIGZyb20gJ2Zhc3RpZnktZmxhc2gnO1xuaW1wb3J0IGZhc3RpZnlFcnJvclBhZ2UgZnJvbSAnZmFzdGlmeS1lcnJvci1wYWdlJztcbmltcG9ydCBmYXN0aWZ5U2VjdXJlU2Vzc2lvbiBmcm9tICdmYXN0aWZ5LXNlY3VyZS1zZXNzaW9uJztcbmltcG9ydCBmYXN0aWZ5TWV0aG9kT3ZlcnJpZGUgZnJvbSAnZmFzdGlmeS1tZXRob2Qtb3ZlcnJpZGUnO1xuaW1wb3J0IHBvaW50T2ZWaWV3IGZyb20gJ3BvaW50LW9mLXZpZXcnO1xuaW1wb3J0IG1vZGVscyBmcm9tICcuL21vZGVscyc7XG5cbmltcG9ydCBrbmV4Q29uZmlnIGZyb20gJy4uL2tuZXhmaWxlLmpzJztcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMvaW5kZXguanMnO1xuXG5kb3RlbnYuY29uZmlnKCk7XG5cbmNvbnN0IHJvbGxiYXIgPSBuZXcgUm9sbGJhcih7XG4gIGFjY2Vzc1Rva2VuOiBwcm9jZXNzLmVudi5QT1NUX1NFUlZFUl9JVEVNX0FDQ0VTU19UT0tFTixcbiAgY2FwdHVyZVVuY2F1Z2h0OiB0cnVlLFxuICBjYXB0dXJlVW5oYW5kbGVkUmVqZWN0aW9uczogdHJ1ZSxcbn0pO1xuXG4vLyAgYXBwLnVzZShyb2xsYmFyLmVycm9ySGFuZGxlcigpKTtcblxucm9sbGJhci5sb2coJ0hlbGxvIHdvcmxkIScpO1xuXG5jb25zdCBzZXRVcFZpZXdzID0gKGFwcCkgPT4ge1xuICBhcHAucmVnaXN0ZXIocG9pbnRPZlZpZXcsIHtcbiAgICBlbmdpbmU6IHtcbiAgICAgIHB1ZzogUHVnLFxuICAgIH0sXG4gICAgaW5jbHVkZVZpZXdFeHRlbnNpb246IHRydWUsXG4gICAgZGVmYXVsdENvbnRleHQ6IHtcbiAgICAgIGFzc2V0UGF0aDogKGZpbGVuYW1lKSA9PiBgL2Fzc2V0cy8ke2ZpbGVuYW1lfWAsXG4gICAgfSxcbiAgfSk7XG4gIGFwcC5kZWNvcmF0ZVJlcGx5KCdyZW5kZXInLCBmdW5jdGlvbiByZW5kZXIodmlld1BhdGgpIHtcbiAgICB0aGlzLnZpZXcodmlld1BhdGgsIHsgcmVwbHk6IHRoaXMgfSk7XG4gIH0pO1xufTtcblxuY29uc3Qgc2V0VXBBc3NldHMgPSAoYXBwKSA9PiB7XG4gIGFwcC5yZWdpc3RlcihmYXN0aWZ5U3RhdGljLCB7XG4gICAgcm9vdDogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ3B1YmxpYycpLFxuICAgIHByZWZpeDogJy9hc3NldHMvJyxcbiAgfSk7XG59O1xuXG5jb25zdCBhZGRIb29rcyA9IChhcHApID0+IHtcbiAgYXBwLmRlY29yYXRlUmVxdWVzdCgnY3VycmVudFVzZXInLCBudWxsKTtcbiAgYXBwLmRlY29yYXRlUmVxdWVzdCgnc2lnbmVkSW4nLCBmYWxzZSk7XG5cbiAgYXBwLmFkZEhvb2soJ3ByZUhhbmRsZXInLCBhc3luYyAocmVxKSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gcmVxLnNlc3Npb24uZ2V0KCd1c2VySWQnKTtcbiAgICBpZiAodXNlcklkKSB7XG4gICAgICByZXEuY3VycmVudFVzZXIgPSBhd2FpdCBhcHAub2JqZWN0aW9uLm1vZGVscy51c2VyLnF1ZXJ5KCkuZmluZEJ5SWQodXNlcklkKTtcbiAgICAgIHJlcS5zaWduZWRJbiA9IHRydWU7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IGFwcCA9IG5ldyBGYXN0aWZ5KHtcbiAgbG9nZ2VyOiB0cnVlLFxufSk7XG5cbmNvbnN0IHJlZ2lzdGVyUGx1Z2lucyA9IChhcHApID0+IHtcbiAgYXBwLnJlZ2lzdGVyKGZhc3RpZnlFcnJvclBhZ2UpO1xuICBhcHAucmVnaXN0ZXIoZmFzdGlmeUZvcm1ib2R5KTtcbiAgc2V0VXBWaWV3cyhhcHApO1xuICBzZXRVcEFzc2V0cyhhcHApO1xuICBhcHAucmVnaXN0ZXIoZmFzdGlmeU9iamVjdGlvbiwge1xuICAgIGtuZXhDb25maWc6IGtuZXhDb25maWcuZGV2ZWxvcG1lbnQsXG4gICAgbW9kZWxzLFxuICB9KTtcbiAgYXBwLnJlZ2lzdGVyKGZhc3RpZnlTZWN1cmVTZXNzaW9uLCB7XG4gICAgc2VjcmV0OiAncXdlcnR5dWlvcGFzZGZnaGprbHp4Y25tbW16eGFzamhka2xhc2prZGxhd3FpJyxcbiAgICBjb29raWU6IHtcbiAgICAgIHBhdGg6ICcvJyxcbiAgICB9LFxuICB9KTtcbiAgYXBwLnJlZ2lzdGVyKGZhc3RpZnlNZXRob2RPdmVycmlkZSk7XG4gIGFwcC5yZWdpc3RlcihmYXN0aWZ5Rmxhc2gpO1xuICByb3V0ZXMoYXBwKTtcbiAgYWRkSG9va3MoYXBwKTtcbn07XG5cbnJlZ2lzdGVyUGx1Z2lucyhhcHApO1xuXG5hcHAubGlzdGVuKHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCwgJzAuMC4wLjAnLCAoZXJyLCBhZGRyZXNzKSA9PiB7XG4gIGlmIChlcnIpIHtcbiAgICBhcHAubG9nLmVycm9yKGVycik7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xuICB9XG4gIGFwcC5sb2cuaW5mbyhgc2VydmVyIGxpc3RlbmluZyBvbiAke2FkZHJlc3N9YCk7XG59KTtcbiJdfQ==
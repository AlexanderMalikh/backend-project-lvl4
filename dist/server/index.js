"use strict";

var _fastify = _interopRequireDefault(require("fastify"));

var _rollbar = _interopRequireDefault(require("rollbar"));

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pug = _interopRequireDefault(require("pug"));

var _fastifyStatic = _interopRequireDefault(require("fastify-static"));

var _pointOfView = _interopRequireDefault(require("point-of-view"));

var _index = _interopRequireDefault(require("./routes/index.js"));

var _webpackConfig = _interopRequireDefault(require("../webpack.config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const app = new _fastify.default({
  logger: true
});
const rollbar = new _rollbar.default({
  accessToken: process.env.POST_SERVER_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
}); //  app.use(rollbar.errorHandler());

rollbar.log('Hello world!');
app.register(_index.default);

const setUpViews = app => {
  const {
    devServer
  } = _webpackConfig.default;
  const domain = `http://${devServer.host}:${devServer.port}`;
  app.register(_pointOfView.default, {
    engine: {
      pug: _pug.default
    },
    defaultContext: {
      assetPath: filename => `${domain}/assets/${filename}`
    }
  });
};

setUpViews(app);

const assetsPath = _path.default.join(__dirname, '..', 'dist', 'public');

app.register(_fastifyStatic.default, {
  root: assetsPath,
  prefix: '/assets/'
});
app.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.log.info(`server listening on ${address}`);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb3RlbnYiLCJjb25maWciLCJhcHAiLCJGYXN0aWZ5IiwibG9nZ2VyIiwicm9sbGJhciIsIlJvbGxiYXIiLCJhY2Nlc3NUb2tlbiIsInByb2Nlc3MiLCJlbnYiLCJQT1NUX1NFUlZFUl9JVEVNX0FDQ0VTU19UT0tFTiIsImNhcHR1cmVVbmNhdWdodCIsImNhcHR1cmVVbmhhbmRsZWRSZWplY3Rpb25zIiwibG9nIiwicmVnaXN0ZXIiLCJyb3V0ZXMiLCJzZXRVcFZpZXdzIiwiZGV2U2VydmVyIiwid2VicGFja0NvbmZpZyIsImRvbWFpbiIsImhvc3QiLCJwb3J0IiwicG9pbnRPZlZpZXciLCJlbmdpbmUiLCJwdWciLCJQdWciLCJkZWZhdWx0Q29udGV4dCIsImFzc2V0UGF0aCIsImZpbGVuYW1lIiwiYXNzZXRzUGF0aCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwiZmFzdGlmeVN0YXRpYyIsInJvb3QiLCJwcmVmaXgiLCJsaXN0ZW4iLCJQT1JUIiwiZXJyIiwiYWRkcmVzcyIsImVycm9yIiwiZXhpdCIsImluZm8iXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQUEsZ0JBQU9DLE1BQVA7O0FBRUEsTUFBTUMsR0FBRyxHQUFHLElBQUlDLGdCQUFKLENBQVk7QUFDdEJDLEVBQUFBLE1BQU0sRUFBRTtBQURjLENBQVosQ0FBWjtBQUlBLE1BQU1DLE9BQU8sR0FBRyxJQUFJQyxnQkFBSixDQUFZO0FBQzFCQyxFQUFBQSxXQUFXLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyw2QkFEQztBQUUxQkMsRUFBQUEsZUFBZSxFQUFFLElBRlM7QUFHMUJDLEVBQUFBLDBCQUEwQixFQUFFO0FBSEYsQ0FBWixDQUFoQixDLENBTUE7O0FBRUFQLE9BQU8sQ0FBQ1EsR0FBUixDQUFZLGNBQVo7QUFFQVgsR0FBRyxDQUFDWSxRQUFKLENBQWFDLGNBQWI7O0FBRUEsTUFBTUMsVUFBVSxHQUFJZCxHQUFELElBQVM7QUFDMUIsUUFBTTtBQUFFZSxJQUFBQTtBQUFGLE1BQWdCQyxzQkFBdEI7QUFDQSxRQUFNQyxNQUFNLEdBQUksVUFBU0YsU0FBUyxDQUFDRyxJQUFLLElBQUdILFNBQVMsQ0FBQ0ksSUFBSyxFQUExRDtBQUNBbkIsRUFBQUEsR0FBRyxDQUFDWSxRQUFKLENBQWFRLG9CQUFiLEVBQTBCO0FBQ3hCQyxJQUFBQSxNQUFNLEVBQUU7QUFDTkMsTUFBQUEsR0FBRyxFQUFFQztBQURDLEtBRGdCO0FBSXhCQyxJQUFBQSxjQUFjLEVBQUU7QUFDZEMsTUFBQUEsU0FBUyxFQUFHQyxRQUFELElBQWUsR0FBRVQsTUFBTyxXQUFVUyxRQUFTO0FBRHhDO0FBSlEsR0FBMUI7QUFRRCxDQVhEOztBQWFBWixVQUFVLENBQUNkLEdBQUQsQ0FBVjs7QUFFQSxNQUFNMkIsVUFBVSxHQUFHQyxjQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsTUFBM0IsRUFBbUMsUUFBbkMsQ0FBbkI7O0FBRUE5QixHQUFHLENBQUNZLFFBQUosQ0FBYW1CLHNCQUFiLEVBQTRCO0FBQzFCQyxFQUFBQSxJQUFJLEVBQUVMLFVBRG9CO0FBRTFCTSxFQUFBQSxNQUFNLEVBQUU7QUFGa0IsQ0FBNUI7QUFLQWpDLEdBQUcsQ0FBQ2tDLE1BQUosQ0FBVzVCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZNEIsSUFBWixJQUFvQixJQUEvQixFQUFxQyxTQUFyQyxFQUFnRCxDQUFDQyxHQUFELEVBQU1DLE9BQU4sS0FBa0I7QUFDaEUsTUFBSUQsR0FBSixFQUFTO0FBQ1BwQyxJQUFBQSxHQUFHLENBQUNXLEdBQUosQ0FBUTJCLEtBQVIsQ0FBY0YsR0FBZDtBQUNBOUIsSUFBQUEsT0FBTyxDQUFDaUMsSUFBUixDQUFhLENBQWI7QUFDRDs7QUFDRHZDLEVBQUFBLEdBQUcsQ0FBQ1csR0FBSixDQUFRNkIsSUFBUixDQUFjLHVCQUFzQkgsT0FBUSxFQUE1QztBQUNELENBTkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmFzdGlmeSBmcm9tICdmYXN0aWZ5JztcbmltcG9ydCBSb2xsYmFyIGZyb20gJ3JvbGxiYXInO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgUHVnIGZyb20gJ3B1Zyc7XG5pbXBvcnQgZmFzdGlmeVN0YXRpYyBmcm9tICdmYXN0aWZ5LXN0YXRpYyc7XG5pbXBvcnQgcG9pbnRPZlZpZXcgZnJvbSAncG9pbnQtb2Ytdmlldyc7XG5pbXBvcnQgcm91dGVzIGZyb20gJy4vcm91dGVzL2luZGV4LmpzJztcbmltcG9ydCB3ZWJwYWNrQ29uZmlnIGZyb20gJy4uL3dlYnBhY2suY29uZmlnLmpzJztcblxuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBhcHAgPSBuZXcgRmFzdGlmeSh7XG4gIGxvZ2dlcjogdHJ1ZSxcbn0pO1xuXG5jb25zdCByb2xsYmFyID0gbmV3IFJvbGxiYXIoe1xuICBhY2Nlc3NUb2tlbjogcHJvY2Vzcy5lbnYuUE9TVF9TRVJWRVJfSVRFTV9BQ0NFU1NfVE9LRU4sXG4gIGNhcHR1cmVVbmNhdWdodDogdHJ1ZSxcbiAgY2FwdHVyZVVuaGFuZGxlZFJlamVjdGlvbnM6IHRydWUsXG59KTtcblxuLy8gIGFwcC51c2Uocm9sbGJhci5lcnJvckhhbmRsZXIoKSk7XG5cbnJvbGxiYXIubG9nKCdIZWxsbyB3b3JsZCEnKTtcblxuYXBwLnJlZ2lzdGVyKHJvdXRlcyk7XG5cbmNvbnN0IHNldFVwVmlld3MgPSAoYXBwKSA9PiB7XG4gIGNvbnN0IHsgZGV2U2VydmVyIH0gPSB3ZWJwYWNrQ29uZmlnO1xuICBjb25zdCBkb21haW4gPSBgaHR0cDovLyR7ZGV2U2VydmVyLmhvc3R9OiR7ZGV2U2VydmVyLnBvcnR9YDtcbiAgYXBwLnJlZ2lzdGVyKHBvaW50T2ZWaWV3LCB7XG4gICAgZW5naW5lOiB7XG4gICAgICBwdWc6IFB1ZyxcbiAgICB9LFxuICAgIGRlZmF1bHRDb250ZXh0OiB7XG4gICAgICBhc3NldFBhdGg6IChmaWxlbmFtZSkgPT4gYCR7ZG9tYWlufS9hc3NldHMvJHtmaWxlbmFtZX1gLFxuICAgIH0sXG4gIH0pO1xufTtcblxuc2V0VXBWaWV3cyhhcHApO1xuXG5jb25zdCBhc3NldHNQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ2Rpc3QnLCAncHVibGljJyk7XG5cbmFwcC5yZWdpc3RlcihmYXN0aWZ5U3RhdGljLCB7XG4gIHJvb3Q6IGFzc2V0c1BhdGgsXG4gIHByZWZpeDogJy9hc3NldHMvJyxcbn0pO1xuXG5hcHAubGlzdGVuKHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCwgJzAuMC4wLjAnLCAoZXJyLCBhZGRyZXNzKSA9PiB7XG4gIGlmIChlcnIpIHtcbiAgICBhcHAubG9nLmVycm9yKGVycik7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xuICB9XG4gIGFwcC5sb2cuaW5mbyhgc2VydmVyIGxpc3RlbmluZyBvbiAke2FkZHJlc3N9YCk7XG59KTtcbiJdfQ==
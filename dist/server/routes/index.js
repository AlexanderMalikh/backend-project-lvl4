"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _session = _interopRequireDefault(require("./session.js"));

var _users = _interopRequireDefault(require("./users.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = [_session.default, _users.default];

var _default = app => routes.forEach(route => route(app));

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9yb3V0ZXMvaW5kZXguanMiXSwibmFtZXMiOlsicm91dGVzIiwic2Vzc2lvbiIsInVzZXJzIiwiYXBwIiwiZm9yRWFjaCIsInJvdXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxNQUFNQSxNQUFNLEdBQUcsQ0FDYkMsZ0JBRGEsRUFFYkMsY0FGYSxDQUFmOztlQUtnQkMsR0FBRCxJQUFTSCxNQUFNLENBQUNJLE9BQVAsQ0FBZ0JDLEtBQUQsSUFBV0EsS0FBSyxDQUFDRixHQUFELENBQS9CLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2Vzc2lvbiBmcm9tICcuL3Nlc3Npb24uanMnO1xuaW1wb3J0IHVzZXJzIGZyb20gJy4vdXNlcnMuanMnO1xuXG5jb25zdCByb3V0ZXMgPSBbXG4gIHNlc3Npb24sXG4gIHVzZXJzLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgKGFwcCkgPT4gcm91dGVzLmZvckVhY2goKHJvdXRlKSA9PiByb3V0ZShhcHApKTtcbiJdfQ==
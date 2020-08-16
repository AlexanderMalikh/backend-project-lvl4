"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _session = _interopRequireDefault(require("./session.js"));

var _users = _interopRequireDefault(require("./users.js"));

var _labels = _interopRequireDefault(require("./labels.js"));

var _statuses = _interopRequireDefault(require("./statuses.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = [_session.default, _users.default, _labels.default, _statuses.default];

var _default = app => routes.forEach(route => route(app));

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9yb3V0ZXMvaW5kZXguanMiXSwibmFtZXMiOlsicm91dGVzIiwic2Vzc2lvbiIsInVzZXJzIiwibGFiZWxzIiwic3RhdHVzZXMiLCJhcHAiLCJmb3JFYWNoIiwicm91dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLE1BQU0sR0FBRyxDQUNiQyxnQkFEYSxFQUViQyxjQUZhLEVBR2JDLGVBSGEsRUFJYkMsaUJBSmEsQ0FBZjs7ZUFPZ0JDLEdBQUQsSUFBU0wsTUFBTSxDQUFDTSxPQUFQLENBQWdCQyxLQUFELElBQVdBLEtBQUssQ0FBQ0YsR0FBRCxDQUEvQixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNlc3Npb24gZnJvbSAnLi9zZXNzaW9uLmpzJztcbmltcG9ydCB1c2VycyBmcm9tICcuL3VzZXJzLmpzJztcbmltcG9ydCBsYWJlbHMgZnJvbSAnLi9sYWJlbHMuanMnO1xuaW1wb3J0IHN0YXR1c2VzIGZyb20gJy4vc3RhdHVzZXMuanMnO1xuXG5jb25zdCByb3V0ZXMgPSBbXG4gIHNlc3Npb24sXG4gIHVzZXJzLFxuICBsYWJlbHMsXG4gIHN0YXR1c2VzLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgKGFwcCkgPT4gcm91dGVzLmZvckVhY2goKHJvdXRlKSA9PiByb3V0ZShhcHApKTtcbiJdfQ==
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _session = _interopRequireDefault(require("./session.js"));

var _users = _interopRequireDefault(require("./users.js"));

var _tags = _interopRequireDefault(require("./tags.js"));

var _statuses = _interopRequireDefault(require("./statuses.js"));

var _tasks = _interopRequireDefault(require("./tasks.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = [_session.default, _users.default, _tags.default, _statuses.default, _tasks.default];

var _default = app => routes.forEach(route => route(app));

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9yb3V0ZXMvaW5kZXguanMiXSwibmFtZXMiOlsicm91dGVzIiwic2Vzc2lvbiIsInVzZXJzIiwidGFncyIsInN0YXR1c2VzIiwidGFza3MiLCJhcHAiLCJmb3JFYWNoIiwicm91dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLE1BQU0sR0FBRyxDQUNiQyxnQkFEYSxFQUViQyxjQUZhLEVBR2JDLGFBSGEsRUFJYkMsaUJBSmEsRUFLYkMsY0FMYSxDQUFmOztlQVFnQkMsR0FBRCxJQUFTTixNQUFNLENBQUNPLE9BQVAsQ0FBZ0JDLEtBQUQsSUFBV0EsS0FBSyxDQUFDRixHQUFELENBQS9CLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2Vzc2lvbiBmcm9tICcuL3Nlc3Npb24uanMnO1xuaW1wb3J0IHVzZXJzIGZyb20gJy4vdXNlcnMuanMnO1xuaW1wb3J0IHRhZ3MgZnJvbSAnLi90YWdzLmpzJztcbmltcG9ydCBzdGF0dXNlcyBmcm9tICcuL3N0YXR1c2VzLmpzJztcbmltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzLmpzJztcblxuY29uc3Qgcm91dGVzID0gW1xuICBzZXNzaW9uLFxuICB1c2VycyxcbiAgdGFncyxcbiAgc3RhdHVzZXMsXG4gIHRhc2tzLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgKGFwcCkgPT4gcm91dGVzLmZvckVhY2goKHJvdXRlKSA9PiByb3V0ZShhcHApKTtcbiJdfQ==
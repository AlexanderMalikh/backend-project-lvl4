"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = async fastify => {
  fastify.get('/', async (request, reply) => reply.view('server/layouts/main.pug'));
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9yb3V0ZXMvaW5kZXguanMiXSwibmFtZXMiOlsiZmFzdGlmeSIsImdldCIsInJlcXVlc3QiLCJyZXBseSIsInZpZXciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7ZUFBZSxNQUFPQSxPQUFQLElBQW1CO0FBQ2hDQSxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxHQUFaLEVBQWlCLE9BQU9DLE9BQVAsRUFBZ0JDLEtBQWhCLEtBQTBCQSxLQUFLLENBQUNDLElBQU4sQ0FBVyx5QkFBWCxDQUEzQztBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBhc3luYyAoZmFzdGlmeSkgPT4ge1xuICBmYXN0aWZ5LmdldCgnLycsIGFzeW5jIChyZXF1ZXN0LCByZXBseSkgPT4gcmVwbHkudmlldygnc2VydmVyL2xheW91dHMvbWFpbi5wdWcnKSk7XG59O1xuIl19
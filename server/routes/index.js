import session from './session.js';
import users from './users.js';
import labels from './labels.js';
import statuses from './statuses.js';

const routes = [
  session,
  users,
  labels,
  statuses,
];

export default (app) => routes.forEach((route) => route(app));

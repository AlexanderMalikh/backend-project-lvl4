import session from './session.js';
import users from './users.js';

const routes = [
  session,
  users,
];

export default (app) => routes.forEach((route) => route(app));

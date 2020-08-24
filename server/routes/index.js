import session from './session.js';
import users from './users.js';
import tags from './tags.js';
import statuses from './statuses.js';
import tasks from './tasks.js';

const routes = [
  session,
  users,
  tags,
  statuses,
  tasks,
];

export default (app) => routes.forEach((route) => route(app));

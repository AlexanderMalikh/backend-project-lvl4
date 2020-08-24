const getTasks = async (app) => app.objection.models.task.query().select(
  'tasks.id', 'tasks.name as taskName', 'tasks.created_at',
  'statuses.name as statusName', 'tags.name as tagName',
  'a.first_name as a_fname', 'a.last_name as a_lname',
  'e.first_name as e_fname', 'e.last_name  as e_lname',
).innerJoin('users as a', 'tasks.author_id', 'a.id')
  .innerJoin('users as e', 'tasks.executor_id', 'e.id')
  .innerJoin('statuses', 'tasks.status_id', 'statuses.id')
  .innerJoin('tags', 'tasks.tag_id', 'tags.id');

export default async (app) => {
  app.get('/tasks', async (request, reply) => {
    const tasks = await getTasks(app);
    reply.render('/tasks/index', { tasks });
    return reply;
  });
};

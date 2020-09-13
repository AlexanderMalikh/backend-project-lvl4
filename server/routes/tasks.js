const getTasks = async (app) => app.objection.models.task.query().select(
  'tasks.id', 'tasks.name as taskName', 'tasks.created_at',
  'statuses.name as statusName', 'tags.name as tagName',
  'a.first_name as a_fname', 'a.last_name as a_lname',
  'e.first_name as e_fname', 'e.last_name  as e_lname',
).innerJoin('users as a', 'tasks.author_id', 'a.id')
  .innerJoin('users as e', 'tasks.executor_id', 'e.id')
  .innerJoin('statuses', 'tasks.status_id', 'statuses.id')
  .innerJoin('tags', 'tasks.tag_id', 'tags.id');

const getTasksFormContent = async (app) => {
  const statuses = await app.objection.models.status.query();
  const tags = await app.objection.models.tag.query();
  const users = await app.objection.models.user.query();
  const content = { statuses, tags, users };
  return content;
};

export default async (app) => {
  app.get('/tasks', async (request, reply) => {
    const tasks = await getTasks(app);
    reply.render('/tasks/index', { tasks });
    return reply;
  });

  app.get('/tasks/new', async (request, reply) => {
    const content = await getTasksFormContent(app);
    reply.render('/tasks/new', { task: content, errors: {}, filled: {} });
    return reply;
  });

  app.get('/tasks/:id/edit', async (request, reply) => {
    const currentTask = await app.objection.models.task.query().findById(request.params.id);
    const content = await getTasksFormContent(app);
    reply.render('tasks/edit', { task: content, currentTask });
  });

  app.post('/tasks/new', async (request, reply) => {
    const currentUserId = request.session.get('userId');
    const content = await getTasksFormContent(app);

    try {
      await app.objection.models.task.query().insert({ authorId: currentUserId, ...request.body });
    } catch ({ data }) {
      request.flash('danger', 'Не удалось создать задачу');
      reply.render('/tasks/new', { task: content, errors: data, filled: request.body });
      return reply;
    }
    reply.redirect('/tasks');
    return reply;
  });

  app.patch('/tasks/:id', async (request, reply) => {
    const { id } = request.params;
    const task = await app.objection.models.task.query().findById(id);
    const content = await getTasksFormContent(app);
    const {
      name, description, statusId, executorId, tagId,
    } = request.body;
    try {
      await task.$query().patch({
        name,
        description,
        statusId,
        executorId,
        tagId,
      });
    } catch ({ data }) {
      console.log(data);
      request.flash('danger', 'Не удалось обновить задачу');
      reply.render('/tasks/edit', { task: content, errors: data, currentTask: request.body });
      return reply;
    }
    request.flash('success', 'Пользователь обновлен');
    reply.redirect('/tasks');
    return reply;
  });

  app.delete('/tasks/:id', async (request, reply) => {
    const { id } = request.params;
    const userId = request.session.get('userId');
    if (!userId || userId.toString() !== id) {
      request.flash('danger', 'Удалять задачи может только создатель');
      reply.redirect('/tasks');
      return reply;
    }
    await app.objection.models.tasks.query().delete().where('id', '=', id);
    reply.redirect('/tasks');
    return reply;
  });
};

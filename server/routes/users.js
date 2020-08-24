export default async (app) => {
  app.get('/', async (request, reply) => reply.render('/welcome/welcome'));

  app.get('/users', async (request, reply) => {
    const users = await app.objection.models.user.query();
    reply.render('/users/users', { users });
    return reply;
  });
  app.get('/users/new', async (request, reply) => reply.render('/users/new'));

  app.post('/users', async (request, reply) => {
    try {
      await app.objection.models.user.query().insert(request.body);
      request.flash('success', 'Пользователь создан.');
      reply.redirect('/');
      return reply;
    } catch ({ data }) {
      request.flash('danger', 'Не удалось создать пользователя');
      reply.render('/users/new', { user: request.body, errors: data });
      return reply;
    }
  });

  app.get('/users/:id/edit', async (request, reply) => {
    const { id } = request.params;
    const userId = request.session.get('userId');
    if (!userId || userId.toString() !== id) {
      request.flash('danger', 'Нельзя редактировать другого пользователя');
      reply.redirect('/users');
      return reply;
    }
    const user = await app.objection.models.user.query().findById(id);
    reply.render('/users/edit', { user, errors: {} });
    return reply;
  });

  app.patch('/users/:id', async (request, reply) => {
    const { id } = request.params;
    const user = await app.objection.models.user.query().findById(id);
    const {
      firstName, lastName, email, password,
    } = request.body;
    try {
      await user.$query().update({
        firstName,
        lastName,
        email,
        passwordDigest: password,
      });
    } catch ({ data }) {
      request.flash('danger', 'Не удалось обновить пользователя');
      reply.render('/users/edit', { user, errors: data });
      return reply;
    }
    request.flash('success', 'Пользователь обновлен');
    reply.redirect('/users');
    return reply;
  });

  app.delete('/users/:id/delete', async (request, reply) => {
    const { id } = request.params;
    const userId = request.session.get('userId');
    if (!userId || userId.toString() !== id) {
      request.flash('danger', 'Нет доступа');
      reply.redirect('/users');
      return reply;
    }
    await app.objection.models.user.query().delete().where('id', '=', id);
    reply.redirect('/users');
    return reply;
  });
};

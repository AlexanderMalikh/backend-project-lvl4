export default async (app) => {
  app.get('/statuses', async (request, reply) => {
    const statuses = await app.objection.models.status.query();
    reply.render('statuses/index', { statuses });
  });
  app.get('/statuses/new', async (request, reply) => {
    reply.render('/statuses/new');
  });
  app.get('/statuses/:id/edit', async (request, reply) => {
    const { id } = request.params;
    const status = await app.objection.models.status.query().findById(id);
    reply.render('/statuses/edit', { status });
    return reply;
  });
  app.patch('/statuses/:id', async (request, reply) => {
    const { id } = request.params;
    const status = await app.objection.models.status.query().findById(id);
    try {
      await status.$query().patch({ name: request.body.name });
    } catch ({ data }) {
      request.flash('danger', 'Не удалось обновить статус');
      reply.render('/statuses/edit', { status, errors: data });
      return reply;
    }
    reply.redirect('/statuses');
    return reply;
  });

  app.post('/statuses', async (request, reply) => {
    try {
      const status = await app.objection.models.status.fromJson(request.body);
      await app.objection.models.status.query().insert(status);
    } catch ({ data }) {
      request.flash('danger', 'Не удалось создать статус');
      reply.render('/statuses/new', { errors: data });
      return reply;
    }
    reply.redirect('/statuses');
    return reply;
  });
  app.delete('/statuses/:id/delete', async (request, reply) => {
    const { id } = request.params;
    await app.objection.models.status.query().delete().where('id', '=', id);
    reply.redirect('/statuses');
  });
};

export default async (app) => {
  app.get('/statuses', async (request, reply) => {
    const statuses = await app.objection.models.status.query();
    reply.render('server/views/statuses/index', { statuses });
  });
  app.get('/statuses/new', async (request, reply) => {
    reply.render('server/views/statuses/new');
  });
  app.post('/statuses', async (request, reply) => {
    try {
      const status = await app.objection.models.status.fromJson(request.body);
      await app.objection.models.status.query().insert(status);
    } catch (err) {
      const errors = err.data.name;
      request.flash('danger', 'Не удалось создать статус');
      reply.render('server/views/statuses/new', { errors });
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

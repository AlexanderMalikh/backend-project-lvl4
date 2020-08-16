export default async (app) => {
  app.get('/labels', async (request, reply) => {
    const labels = await app.objection.models.label.query();
    reply.render('server/views/labels/index', { labels });
  });
  app.get('/labels/new', async (request, reply) => {
    reply.render('server/views/labels/new');
  });
  app.post('/labels', async (request, reply) => {
    try {
      const label = await app.objection.models.label.fromJson(request.body);
      await app.objection.models.label.query().insert(label);
    } catch (err) {
      const errors = err.data.name;
      request.flash('danger', 'Не удалось создать метку');
      reply.render('server/views/labels/new', { errors });
      return reply;
    }
    reply.redirect('/labels');
    return reply;
  });
  app.delete('/labels/:id/labels', async (request, reply) => {
    const { id } = request.params;
    await app.objection.models.label.query().delete().where('id', '=', id);
    reply.redirect('/labels');
  });
};

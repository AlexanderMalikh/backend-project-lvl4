export default async (app) => {
  app.get('/statuses', async (request, reply) => {
    const statuses = await app.objection.models.status.query();
    reply.render('server/views/statuses/index', { statuses });
  });
  app.get('/statuses/new', async (request, reply) => {
    reply.render('server/views/statuses/new');
  });
  app.post('/statuses', async (request, reply) => {
    const status = await app.objection.models.status.fromJson(request.body);
    await app.objection.models.status.query().insert(status);
    reply.redirect('/statuses');
  });
};

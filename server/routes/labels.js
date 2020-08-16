export default async (app) => {
  app.get('/labels', async (request, reply) => {
    const labels = await app.objection.models.label.query();
    reply.render('server/views/labels/index', { labels });
  });
  app.get('/labels/new', async (request, reply) => {
    reply.render('server/views/labels/new');
  });
  app.post('/labels', async (request, reply) => {
    const label = await app.objection.models.label.fromJson(request.body);
    await app.objection.models.label.query().insert(label);
    reply.redirect('/labels');
  });
};

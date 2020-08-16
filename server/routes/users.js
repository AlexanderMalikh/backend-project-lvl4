export default async (app) => {
  app.get('/', async (request, reply) => reply.render('server/views/welcome/welcome'));
  app.get('/users', async (request, reply) => {
    const users = await app.objection.models.user.query();
    reply.render('server/views/users/users', { users });
    return reply;
  });
  app.get('/users/new', async (request, reply) => reply.render('server/views/users/new'));
  app.post('/users/new', async (request, reply) => {
    const user = await app.objection.models.user.fromJson(request.body);
    await app.objection.models.user.query().insert(user);
    reply.render('/server/views/welcome/welcome');
    return reply;
  });
};

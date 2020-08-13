export default async (fastify) => {
  fastify.get('/', async (request, reply) => reply.view('server/views/welcome/welcome'));
  fastify.get('/users', async (request, reply) => reply.view('server/views/users/users'));
  fastify.get('/session', async (request, reply) => reply.view('server/views/users/register'));
  fastify.get('/users/new', async (request, reply) => reply.view('server/views/users/new'));
  fastify.post('/users/new', async (request, reply) => {
    return fastify.objection.models.user.query();
  });
};

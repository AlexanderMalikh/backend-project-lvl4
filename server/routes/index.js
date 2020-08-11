export default async (fastify) => {
  fastify.get('/', async (request, reply) => reply.view('server/views/welcome/welcome'));
  fastify.get('/users', async (request, reply) => reply.view('server/views/users/users'));
  fastify.get('/users/new', async (request, reply) => reply.view('server/views/users/new'));
};

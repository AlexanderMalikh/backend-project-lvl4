export default async (fastify) => {
  fastify.get('/', async (request, reply) => reply.view('server/views/layouts/main'));
};
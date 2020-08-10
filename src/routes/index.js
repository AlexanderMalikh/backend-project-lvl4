export default async (fastify) => {
  fastify.get('/', async () => ({ hello: 'NNNNN' }));
};

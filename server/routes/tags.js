export default async (app) => {
  app.get('/tags', async (request, reply) => {
    const tags = await app.objection.models.tag.query();
    reply.render('/tags/index', { tags });
  });

  app.get('/tags/new', async (request, reply) => {
    reply.render('/tags/new');
  });

  app.get('/tags/:id/edit', async (request, reply) => {
    const { id } = request.params;
    const tag = await app.objection.models.tag.query().select('*').findById(id);
    reply.render('/tags/edit', { tag });
  });

  app.post('/tags', async (request, reply) => {
    try {
      const tag = await app.objection.models.tag.fromJson(request.body);
      await app.objection.models.tag.query().insert(tag);
    } catch ({ data }) {
      request.flash('danger', 'Не удалось создать метку');
      reply.render('/tags/new', { errors: data });
      return reply;
    }
    reply.redirect('/tags');
    return reply;
  });

  app.patch('/tags/:id', async (request, reply) => {
    const { id } = request.params;
    const newName = request.body.name;
    const tag = await app.objection.models.tag.query().findById(id);
    try {
      await tag.$query().patch({ name: newName });
    } catch ({ data }) {
      request.flash('danger', 'Не удалось обновить метку');
      reply.render('/tags/edit', { errors: data, tag });
      return reply;
    }
    reply.redirect('/tags');
    return reply;
  });

  app.delete('/tags/:id', async (request, reply) => {
    const { id } = request.params;
    await app.objection.models.tag.query().delete().where('id', '=', id);
    reply.redirect('/tags');
  });
};

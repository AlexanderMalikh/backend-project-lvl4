import encrypt from '../lib/secure.js';

export default async (app) => {
  app.get('/session/new', async (request, reply) => reply.render('/users/register'));

  app.post('/session', async (request, reply) => {
    const { email, password } = request.body;
    const user = await app.objection.models.user.query().select('*').where('email', '=', email);

    if (!user || encrypt(password) !== user[0].passwordDigest) {
      request.flash('danger', 'Неправильно указан email или пароль');
      reply.redirect('/session/new');
    }

    request.session.set('userId', user[0].id);
    request.flash('info', 'Авторизация прошла успешно');
    reply.redirect('/');
  });

  app.delete('/session', async (request, reply) => {
    request.session.set('userId', null);
    request.flash('info', 'Good bye');
    reply.redirect('/');
  });
};

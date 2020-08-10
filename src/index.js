import Fastify from 'fastify';
import Rollbar from 'rollbar';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

const app = new Fastify({
  logger: true,
});
/*
const rollbar = new Rollbar({
  accessToken: process.env.POST_SERVER_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

//  app.use(rollbar.errorHandler());

rollbar.log('Hello world!');
*/
app.register(routes);

app.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});

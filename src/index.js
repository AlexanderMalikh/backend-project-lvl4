import fastify from 'fastify';
import Rollbar from 'rollbar';
import dotenv from 'dotenv';
dotenv.config();

const app = new fastify({
  logger: true
});

const rollbar = new Rollbar({
  accessToken: process.env.POST_SERVER_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
});

//app.use(rollbar.errorHandler());

rollbar.log("Hello world!");

app.get('/', (request, reply) => {
  reply.send({hello: 'world'});
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server app listening on port ${process.env.PORT}!`);
});

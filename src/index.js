import fastify from 'fastify';
import Rollbar from 'rollbar';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('Example app listening on port 5000!');
});

import Express from 'express';
import Rollbar from 'rollbar';
const PORT = process.env.PORT || 5000;
const app = new Express();

const rollbar = new Rollbar({
  accessToken: 'ac8581f4db984bad85eb5bc501b1f444',
  captureUncaught: true,
  captureUnhandledRejections: true
});

app.use(rollbar.errorHandler());

rollbar.log("Hello world!");

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});

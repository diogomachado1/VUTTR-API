import app from './app';

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Running...');
  // eslint-disable-next-line no-console
  console.log(process.env.NODE_ENV);
});

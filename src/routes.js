import { Router } from 'express';

import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import ToolController from './app/controllers/ToolController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/', (req, res) => res.send('ok Test'));

if (process.env.NODE_ENV === 'production') {
  const bruteStore = new BruteRedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });

  const bruteForce = new Brute(bruteStore).prevent;
  routes.post('/sessions', bruteForce, SessionController.store);
} else {
  routes.post('/sessions', SessionController.store);
}
routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/tools', ToolController.index);
routes.post('/tools', ToolController.store);
routes.put('/tools/:id', ToolController.update);
routes.delete('/tools/:id', ToolController.delete);

export default routes;

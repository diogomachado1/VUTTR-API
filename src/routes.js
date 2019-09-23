import { Router } from 'express';

import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import ToolController from './app/controllers/ToolController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/tools', ToolController.index);
routes.post('/tools', ToolController.store);
routes.delete('/tools/:id', ToolController.delete);

export default routes;

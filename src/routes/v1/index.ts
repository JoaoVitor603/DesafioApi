import { Router } from 'express';
import SessionRouter from './sessions.routes';
import UserRouter from './user.routes';

const routes = Router();

routes.use('/users', UserRouter);
routes.use('/sessions', SessionRouter);
export default routes;

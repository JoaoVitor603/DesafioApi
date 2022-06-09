import { Router } from 'express';
import SessionController from '../../controllers/session.controller';

const SessionRouter = Router();

const sessionController = new SessionController();

SessionRouter.post('/', sessionController.create);

export default SessionRouter;

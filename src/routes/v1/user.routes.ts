import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../../controllers/user.controller';
import isAuthenticated from '../../middlewares/isAuthenticated';

import isAdmin from '../../middlewares/authAdmin';

const UserRouter = Router();

const userController = new UserController();

UserRouter.get('/', isAuthenticated, userController.index);
UserRouter.get('/:id', isAuthenticated, userController.show);
UserRouter.put('/:id', isAdmin, userController.edit);
UserRouter.delete('/:id', isAdmin, userController.delete);

UserRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      birthdate: Joi.string().required(),
      password: Joi.string().required(),
      observation: Joi.string(),
      admin: Joi.bool(),
    },
  }),
  isAdmin,
  userController.create
);
// Utilizar Celebrate com o metodo put causa erro Error: data and salt arguments required

export default UserRouter;

import { Router } from 'express';

import UserController from '../../controllers/user.controller';
import isAuthenticated from '../../middlewares/isAuthenticated';
// import  { createProductHandler } from '../../controllers/user.controller';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// // import requireUser from '../../middlewares/requireUser';
// // import validateResource from '../../middlewares/validateResource';

// // import { createProductSchema } from '../../schemas/product.schema';

const UserRouter = Router();

const userController = new UserController();

UserRouter.get('/', isAuthenticated, userController.index);
UserRouter.get('/:id', userController.show);
UserRouter.post('/', userController.create);
UserRouter.put('/:id', userController.edit);
UserRouter.delete('/:id', userController.delete);

/**
 *
 * '/api/products/{productId}':
 *  get:
 *     tags:
 *     - Products
 *     summary: Get a single product by the productId
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - name: productId
 *        in: path
 *        description: The id of the product
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

// routes.route('/').post(
//   // [requireUser, validateResource(createProductSchema)],
//   [validateResource(createProductSchema)],
//   createProductHandler

export default UserRouter;

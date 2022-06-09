import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import EditUserService from '../services/EditUserService';
import ListUsersService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const ListUser = new ListUsersService();
    //  console.log(request.user.id);
    // const { admin } = request.user.admin;

    const users = await ListUser.execute();

    return response.json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showUser = new ShowUserService();

    const user = await showUser.execute({ id });
    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password, name, observation, admin } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      cpf,
      password,
      name,
      observation,
      admin,
    });
    return response.json(user);
  }

  public async edit(request: Request, response: Response): Promise<Response> {
    const { cpf, password, name, observation, admin } = request.body;
    const { id } = request.params;

    const editUser = new EditUserService();

    const user = await editUser.execute({
      id,
      name,
      cpf,
      password,
      observation,
      admin,
    });
    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = new DeleteUserService();
    await deleteUser.execute({ id });

    return response.json([]);
  }
}

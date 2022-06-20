import { Request, Response } from 'express';
import CreateUserSessionService from '../services/Permissions/CreateSession';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    const createSession = new CreateUserSessionService();

    const user = await createSession.execute({ cpf, password });

    return response.json(user);
  }
}

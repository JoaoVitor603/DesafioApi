import { Request, Response } from 'express';
import CreateUserSessionService from '../services/Permissions/CreateSession';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id, password } = request.body;

    const createSession = new CreateUserSessionService();

    const user = await createSession.execute({ id, password });

    return response.json(user);
  }
}

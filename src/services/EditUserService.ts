import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import Users from '../database/entities/User.Entity';
import { UserRepository } from '../database/repositories/UserRepository';
import AppError from '../utils/AppError';

interface IRequest {
  id: string;
  observation: string;
  admin: boolean;
}

class EditUserService {
  public async execute({ id, observation, admin }: IRequest): Promise<Users> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found.', StatusCodes.NOT_FOUND);
    }
    user.admin = admin;
    user.observation = observation;

    await usersRepository.save(user);

    return user;
  }
}
export default EditUserService;

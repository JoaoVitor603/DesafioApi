import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../database/repositories/UserRepository';
import AppError from '../utils/AppError';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found.', StatusCodes.NOT_FOUND);
    }
    await userRepository.remove(user);
  }
}
export default DeleteUserService;

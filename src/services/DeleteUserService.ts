import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../database/repositories/UserRepository';
import ApiError from '../utils/apiError.utils';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(id);

    if (!user) {
      throw new ApiError(401, true, 'User not found');
    }
    await userRepository.remove(user);
  }
}
export default DeleteUserService;

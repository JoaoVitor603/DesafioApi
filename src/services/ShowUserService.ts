import { getCustomRepository } from 'typeorm';
import Users from '../database/entities/User.Entity';
import { UserRepository } from '../database/repositories/UserRepository';
import ApiError from '../utils/apiError.utils';

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<Users> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(id);

    if (!user) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new ApiError(400, false, 'User not found');
    }
    return user;
  }
}
export default ShowUserService;

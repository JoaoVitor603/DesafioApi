import { getCustomRepository } from 'typeorm';
import Users from '../database/entities/User.Entity';
import { UserRepository } from '../database/repositories/UserRepository';

class ListUsersService {
  public async execute(): Promise<Users[]> {
    const usersRepository = getCustomRepository(UserRepository);

    const users = await usersRepository.find();

    return users;
  }
}
export default ListUsersService;

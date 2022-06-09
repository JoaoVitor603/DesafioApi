import { getCustomRepository } from 'typeorm';
import Users from '../database/entities/User.Entity';
import { UserRepository } from '../database/repositories/UserRepository';
import ApiError from '../utils/apiError.utils';

interface IRequest {
  id: string;
  cpf: string;
  name: string;
  password: string;
  observation: string;
  admin: boolean;
}

class EditUserService {
  public async execute({
    id,
    cpf,
    password,
    name,
    observation,
    admin,
  }: IRequest): Promise<Users> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new ApiError(401, false, 'Usuário não encontrado por id');
    }

    user.name = name;
    user.cpf = cpf;
    user.password = password;
    user.admin = admin;
    user.observation = observation;

    await usersRepository.save(user);

    return user;
  }
}
export default EditUserService;
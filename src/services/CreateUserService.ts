import { hash } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import Users from '../database/entities/User.Entity';
import { UserRepository } from '../database/repositories/UserRepository';
import ApiError from '../utils/apiError.utils';

interface IRequest {
  name: string;
  cpf: string;
  password: string;
  observation: string;
  admin: boolean;
}

class CreateUserService {
  public async execute({
    name,
    cpf,
    password,
    observation,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    admin,
  }: IRequest): Promise<Users> {
    const usersRepository = getCustomRepository(UserRepository);
    const cpfExist = await usersRepository.findByCpf(cpf);

    if (cpfExist) {
      throw new ApiError(401, true, 'CPF já cadastrado');
    }

    const hashedPassowrd = await hash(password, 8);

    const user = usersRepository.create({
      name,
      cpf,
      password: hashedPassowrd,
      observation,
      admin: false,
    });

    await usersRepository.save(user);

    return user;
  }
}
export default CreateUserService;

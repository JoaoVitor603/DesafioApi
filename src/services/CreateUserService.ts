import { hash } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import Users from '../database/entities/User.Entity';
import { UserRepository } from '../database/repositories/UserRepository';
import AppError from '../utils/AppError';

interface IRequest {
  name: string;
  cpf: string;
  birthdate: Date;
  password: string;
  observation?: string;
  admin: boolean;
}

class CreateUserService {
  public async execute({
    name,
    cpf,
    birthdate,
    password,
    observation,
    admin,
  }: IRequest): Promise<Users> {
    const usersRepository = getCustomRepository(UserRepository);
    const cpfExist = await usersRepository.findByCpf(cpf);

    if (cpfExist) {
      throw new AppError('User already exists.', StatusCodes.CONFLICT);
    }

    const hashedPassowrd = await hash(password, 7);

    const user = usersRepository.create({
      name,
      cpf,
      birthdate,
      password: hashedPassowrd,
      observation,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}
export default CreateUserService;

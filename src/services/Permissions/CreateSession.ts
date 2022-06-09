import { compare } from 'bcrypt';

import { getCustomRepository } from 'typeorm';
import { signJwt } from '../../utils/jwt.utils';

import Users from '../../database/entities/User.Entity';
import { UserRepository } from '../../database/repositories/UserRepository';
import ApiError from '../../utils/apiError.utils';

interface IRequest {
  cpf: string;
  password: string;
}

interface IResponse {
  user: Users;
  token: string;
}

// Alterar a tipagem da promise após a criação da Token
class CreateUserSessionService {
  public async execute({ cpf, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findByCpf(cpf);

    if (!user) {
      throw new ApiError(401, false, 'Incorrect cpf/password .');
    }

    const passwordConfirm = await compare(password, user.password);

    if (!passwordConfirm) {
      throw new ApiError(401, false, 'Incorrect password.');
    }

    const token = signJwt({});

    // const token = sign({}, config.jwtSecret, {
    //   subject: user.id,
    //   expiresIn: '1d',
    // });

    return { user, token };
  }
}
export default CreateUserSessionService;

import { compare } from 'bcrypt';

import { getCustomRepository } from 'typeorm';
import { signJwt } from '../../utils/jwt.utils';

import Users from '../../database/entities/User.Entity';
import { UserRepository } from '../../database/repositories/UserRepository';
import ApiError from '../../utils/apiError.utils';

interface IRequest {
  id: string;
  password: string;
}

interface IResponse {
  user: Users;
  token: string;
}

class CreateUserSessionService {
  public async execute({ id, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new ApiError(401, false, 'Incorrect cpf/password .');
    }

    const passwordConfirm = await compare(password, user.password);

    if (!passwordConfirm) {
      throw new ApiError(401, false, 'Incorrect password.');
    }

    const token = signJwt({ sub: user.id, admin: user.admin });

    return { user, token };
  }
}
export default CreateUserSessionService;

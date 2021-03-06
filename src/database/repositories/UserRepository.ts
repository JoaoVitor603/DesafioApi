import { EntityRepository, Repository } from 'typeorm';
import Users from '../entities/User.Entity';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  public async findByCpf(cpf: string): Promise<Users | undefined> {
    const user = await this.findOne({
      where: {
        cpf,
      },
    });
    return user;
  }

  public async findById(id: string): Promise<Users | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });
    return user;
  }
}

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

  // Padrão o parametro id era tipo String
  public async findById(id: string): Promise<Users | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  public async findByAdmin(admin: boolean): Promise<Users | undefined> {
    const user = await this.findOne({
      where: {
        admin,
      },
    });
    return user;
  }
}

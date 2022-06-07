import { EntityRepository, Repository } from 'typeorm';
import Users from '../entities/User.Entity';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  public async findByName(cpf: string): Promise<Users | undefined> {
    const user = this.findOne({ where: { cpf } });

    return user;
  }
  //Padrão o parametro id era tipo String
  public async findById(id: number): Promise<Users | undefined> {
    const user = this.findOne({ where: { id } });

    return user;
  }
}

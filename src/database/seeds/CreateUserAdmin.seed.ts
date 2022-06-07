import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import Users from '../entities/User.Entity';

export default class CreateProducts implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<any> {
    const rows = await connection.getRepository(Users).count();
    if (rows <= 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values([
          {
            name: 'usuarioAdm',
            observation: 'usuário criado automaticamente',
            admin: true,
            password: 'admin',
            cpf: '000.000.000-00'
          },

        ])
        .execute();
    }
  }
}

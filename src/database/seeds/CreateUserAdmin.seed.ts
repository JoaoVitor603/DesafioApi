import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { hash } from 'bcrypt';
import Users from '../entities/User.Entity';

export default class CreateAdmin implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<any> {
    const rows = await connection.getRepository(Users).count();
    if (rows <= 0) {
      const password = 'admin';
      const hashedPassowrd = await hash(password, 7);
      await connection

        .createQueryBuilder()
        .insert()
        .into(Users)
        .values([
          {
            name: 'usuarioAdm',
            observation: 'usuário criado automaticamente',
            admin: true,
            password: hashedPassowrd,
            cpf: '000.000.000-00',
            birthdate: '01/01/2000',
          },
        ])

        .execute();
    }
  }
}

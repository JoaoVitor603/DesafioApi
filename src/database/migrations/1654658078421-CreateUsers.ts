import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1654658078421 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // se versão < 10
    // await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'name',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar(14)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'birthdate',
            type: 'date',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'observation',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'admin',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}

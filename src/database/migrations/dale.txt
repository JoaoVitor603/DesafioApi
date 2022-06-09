import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Product1638200609472 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // se versão < 10
    // await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar(14)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar(30)',
            isNullable: false,
          },
          {
            name: 'observation',
            type: 'varchar(400)',
            isNullable: true,
          },
          {
            name: 'admin',
            type: 'boolean',
            isNullable: false,
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
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}

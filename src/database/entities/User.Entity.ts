import { Column, Entity } from 'typeorm';
import Base from './Base.Entity';

@Entity('users')
export default class Users extends Base {
  @Column({ length: 50 })
  public name: string;

  @Column({ length: 14 })
  public cpf: string;

  @Column({ length: 30 })
  public password: string;

  @Column({ length: 100, nullable: true })
  public observation: string;

  @Column({ nullable: false })
  admin: boolean;
}

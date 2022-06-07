import { Column, Entity } from 'typeorm';
import Base from './Base.Entity';

@Entity('users')
export default class Users extends Base {
  @Column({ length: 100 })
  public name: string;

  @Column({ length: 14 })
  public cpf: string;

  @Column({ length: 30 })
  public password: string;

  @Column({ length: 400, nullable: true })
  public observation: string;

  @Column ()
  public admin: boolean;

}

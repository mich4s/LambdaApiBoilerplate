import { Column, Entity } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity('users')
export class User extends BaseModel {
  @Column()
  name: string;

  @Column()
  email: string;

}

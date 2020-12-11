import { injectable } from 'inversify';
import { UsersRepository } from '../repositories/UsersRepository';

@injectable()
export class UsersService {

  constructor(private usersRepository: UsersRepository) {
  }

  async show(): Promise<any> {
    return this.usersRepository.findByName();
  }
}

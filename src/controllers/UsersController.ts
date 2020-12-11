import { injectable } from 'inversify';
import { UsersService } from '../services/UsersService';

@injectable()
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  public async show() {
    return this.usersService.show();
  }

  public async show2() {

    return 2;
  }
}

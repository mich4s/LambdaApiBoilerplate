import { injectable } from 'inversify';
import { UsersService } from '../services/UsersService';
import { Logger } from '../helpers/Logger';

@injectable()
export class UsersController {
  constructor(private usersService: UsersService, private logger: Logger) {}

  public async show() {
    this.logger.info('Showing user');
    return this.usersService.show();
  }

  public async show2() {
    return 2;
  }
}

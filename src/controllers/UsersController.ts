import { injectable } from 'inversify';
import { UsersService } from '../services/UsersService';
import { Logger } from '../helpers/Logger';
import { Controller, Get } from '../../config/decorators';
import { Request } from 'lambda-api';

@injectable()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private logger: Logger) {}

  @Get()
  async show(request: Request) {
    this.logger.info('Showing user');
    return this.usersService.show();
  }

  async show2() {
    return 2;
  }
}

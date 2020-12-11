import { API, Request, Response } from 'lambda-api';
import container from './container';
import { UsersController } from '../src/controllers/UsersController';

export const router = (api: API) => {
  api.get('/users', (request: Request, response: Response) => {
    return container.resolve(UsersController).show();
  });

  api.get('/users2', (request: Request, response: Response) => {
    return container.resolve(UsersController).show2();
  });
};



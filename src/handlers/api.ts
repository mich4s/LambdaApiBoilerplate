import { APIGatewayEvent } from 'aws-lambda';
import '../../config/typeorm';
import { App } from '../App';
import { UsersRepository } from '../repositories/UsersRepository';
import { UsersController } from '../controllers/UsersController';

const app: App = new App({
  controllers: [UsersController],
  repositories: [UsersRepository],
});

export async function handler(event: APIGatewayEvent, context) {
  return await app.run(event, context);
}

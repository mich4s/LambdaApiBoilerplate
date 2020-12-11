import { APIGatewayEvent } from 'aws-lambda';
import '../../config/typeorm';
import { App } from '../App';
import { UsersRepository } from '../repositories/UsersRepository';

const app: App = new App();

export async function handler(event: APIGatewayEvent, context) {
  await app.init({
    repositories: [
      UsersRepository,
    ],
  });

  return await app.run(event, context);
}

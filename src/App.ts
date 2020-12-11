import connection from '../config/typeorm';
import { Connection } from 'typeorm';
import createApi, { API } from 'lambda-api';
import { router } from '../config/router';
import { APIGatewayEvent, Context } from 'aws-lambda';
import container from '../config/container';

export interface InitParams {
  repositories: any[];
}

export class App {
  private initialized: boolean;

  private api: API;

  constructor() {
    this.initialized = false;
  }

  async init(params: InitParams): Promise<App> {
    if (this.initialized) {
      return this;
    }

    await this.connectDatabase(params.repositories);

    this.createRouter();

    this.initialized = true;
    return this;
  }

  async run(event: APIGatewayEvent, context: Context): Promise<any> {
    return this.api.run(event, context);
  }

  private async connectDatabase(repositories: any[]): Promise<Connection> {
    await connection.connect();

    // TODO this should be refactored to inject all repositories from directory without this hack
    for (const repository of repositories) {
      container.bind(repository).toConstantValue(connection.getCustomRepository(repository));
    }

    return connection;
  }

  private createRouter(): API {
    const api: API = createApi({});

    router(api);

    this.api = api;

    return api;
  }
}

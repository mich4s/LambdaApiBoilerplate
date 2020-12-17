import connection from '../config/typeorm';
import { Connection } from 'typeorm';
import createApi, { API, Request, Response } from 'lambda-api';
import { APIGatewayEvent, Context } from 'aws-lambda';
import container from '../config/container';
import * as urljoin from 'url-join';
import { RequestMethod } from '../config/decorators';
import { UsersController } from './controllers/UsersController';

export interface InitParams {
  repositories: any[];
  controllers: any[];
}

export class App {
  private initialized: boolean;

  private repositories: any[];
  private controllers: any[];

  private api: API;

  constructor() {
    this.initialized = false;
  }

  async init(params: InitParams): Promise<App> {
    if (this.initialized) {
      return this;
    }

    this.repositories = params.repositories;
    this.controllers = params.controllers;

    await this.connectDatabase();

    this.createRouter();

    this.initialized = true;
    return this;
  }

  async run(event: APIGatewayEvent, context: Context): Promise<any> {
    return this.api.run(event, context);
  }

  private async connectDatabase(): Promise<Connection> {
    await connection.connect();

    // TODO this should be refactored to inject all repositories from directory without this hack
    for (const repository of this.repositories) {
      container.bind(repository).toConstantValue(connection.getCustomRepository(repository));
    }

    return connection;
  }

  private createRouter(): API {
    const api: API = createApi({});

    this.controllers.forEach((controller: any) => {
      const controllerMethods: string[] = Object.getOwnPropertyNames(controller.prototype);

      const controllerPath = Reflect.getMetadata('path', controller);

      controllerMethods.forEach((methodName: string) => {
        if (methodName === 'constructor') {
          return;
        }

        const actionPath = Reflect.getMetadata('path', controller.prototype[methodName]);
        const actionMethod: RequestMethod = Reflect.getMetadata('method', controller.prototype[methodName]);

        if (!actionMethod || !actionPath) {
          return;
        }

        api.METHOD(actionMethod, urljoin(controllerPath, actionPath), (request: Request, response: Response) => {
          return container.resolve(controller)[methodName](request);
        });
      });
    });

    this.api = api;

    return api;
  }
}

import connection from '../config/typeorm';
import { Connection } from 'typeorm';
import createApi, { API, NextFunction, Request, Response } from 'lambda-api';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { Container } from 'inversify';
import { RouteManager, RegisteredControllerAction } from './core/RouteManager';

export interface InitParams {
  repositories: any[];
  controllers: any[];
}

export class App {
  private initialized: boolean;

  private repositories: any[];
  private controllers: any[];

  private container: Container;

  private api: API;

  constructor(params: InitParams) {
    this.initialized = false;

    this.container = new Container({
      defaultScope: 'Singleton',
      autoBindInjectable: true,
    });

    this.repositories = params.repositories;
    this.controllers = params.controllers;
  }

  async init(): Promise<App> {
    if (this.initialized) {
      return this;
    }

    await this.connectDatabase();

    this.createRouter();

    this.initialized = true;
    return this;
  }

  async run(event: APIGatewayEvent, context: Context): Promise<any> {
    await this.init();
    return this.api.run(event, context);
  }

  private async connectDatabase(): Promise<Connection> {
    await connection.connect();

    // TODO this should be refactored to inject all repositories from directory without this hack
    for (const repository of this.repositories) {
      this.container.bind(repository).toConstantValue(connection.getCustomRepository(repository));
    }

    return connection;
  }

  private createRouter(): API {
    const api: API = createApi({});

    const routes = new RouteManager().register(this.controllers);

    routes.forEach((route: RegisteredControllerAction) => {
      api.METHOD(route.method, route.path, (request: Request, response: Response) => {
        return this.container.resolve(route.controller)[route.methodName](request);
      });
    });

    // api.use((error: Error, _request: Request, response: Response, next: NextFunction) => {
    //   console.log('test');
    //   console.log(error);
    //   console.log('test');
    //   // onst errorResponse = ErrorHandlerMiddleware.prepareErrorResponse(error);
    //   //
    //   // response.status(errorResponse.statusCode);
    //   // response.send({
    //   //                 error: true,
    //   //                 data: errorResponse.data,
    //   //               });
    //
    //   next();
    // });

    this.api = api;

    return api;
  }
}

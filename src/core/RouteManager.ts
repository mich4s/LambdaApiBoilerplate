import { RequestMethod } from '../../config/decorators';
import * as urljoin from 'url-join';

export interface RegisteredController {
  guards: any[];
  middlewares: any[];
  actions: RegisteredControllerAction[];
}

export interface RegisteredControllerAction {
  guards: any[];
  middlewares: any[];
  controller: any;
  methodName: any;
  path: string;
  method: RequestMethod;
}

export class RouteManager {
  register(controllers: any[]): RegisteredControllerAction[] {
    return controllers
      .map((controller: any) => {
        return this.registerController(controller);
      })
      .reduce((previousValue, currentValue: RegisteredControllerAction[]) => {
        return [...previousValue, ...currentValue];
      }, []);
  }

  private registerController(controller: any): RegisteredControllerAction[] {
    const controllerMethods: string[] = Object.getOwnPropertyNames(controller.prototype);

    const controllerPath = Reflect.getMetadata('path', controller);

    return controllerMethods
      .map((methodName: string): RegisteredControllerAction | undefined => {
        if (methodName === 'constructor') {
          return;
        }

        const actionPath = Reflect.getMetadata('path', controller.prototype[methodName]);
        const actionMethod: RequestMethod = Reflect.getMetadata('method', controller.prototype[methodName]);

        if (!actionMethod || !actionPath) {
          return;
        }

        return {
          controller,
          methodName,
          guards: [],
          middlewares: [],
          path: urljoin(controllerPath, actionPath),
          method: actionMethod,
        };
      })
      .filter((action: RegisteredControllerAction) => !!action);
  }
}

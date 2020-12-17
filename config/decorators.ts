export const METHOD_METADATA = 'method';
export const PATH_METADATA = 'path';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  ANY = 'ANY',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

// tslint:disable-next-line:variable-name function-name
export function Controller(path: string): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  };
}

export interface RequestMappingMetadata {
  path?: string | string[];
  method?: RequestMethod;
}

const defaultMetadata = {
  [PATH_METADATA]: '/',
  [METHOD_METADATA]: RequestMethod.GET,
};

// tslint:disable-next-line:variable-name
export const RequestMapping = (metadata: RequestMappingMetadata = defaultMetadata): MethodDecorator => {
  const pathMetadata = metadata[PATH_METADATA];
  const path = pathMetadata && pathMetadata.length ? pathMetadata : '/';
  const requestMethod = metadata[METHOD_METADATA] || RequestMethod.GET;

  return (target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, requestMethod, descriptor.value);
    return descriptor;
  };
};

const createMappingDecorator = (method: RequestMethod) => (path?: string | string[]): MethodDecorator => {
  return RequestMapping({
    [PATH_METADATA]: path,
    [METHOD_METADATA]: method,
  });
};

// tslint:disable-next-line:variable-name
export const Post = createMappingDecorator(RequestMethod.POST);

// tslint:disable-next-line:variable-name
export const Get = createMappingDecorator(RequestMethod.GET);

// tslint:disable-next-line:variable-name
export const Delete = createMappingDecorator(RequestMethod.DELETE);

// tslint:disable-next-line:variable-name
export const Put = createMappingDecorator(RequestMethod.PUT);

// tslint:disable-next-line:variable-name
export const Patch = createMappingDecorator(RequestMethod.PATCH);

// tslint:disable-next-line:variable-name
export const Options = createMappingDecorator(RequestMethod.OPTIONS);

// tslint:disable-next-line:variable-name
export const Head = createMappingDecorator(RequestMethod.HEAD);

// tslint:disable-next-line:variable-name
export const Any = createMappingDecorator(RequestMethod.ANY);

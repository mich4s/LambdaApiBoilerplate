import { injectable } from 'inversify';

import { ApiError, ErrorInterceptor } from 'ts-lambda-api';

@injectable()
export class ErrorHandlerMiddleware extends ErrorInterceptor {
  public async intercept(apiError: ApiError) {

    console.log(apiError);
    // endpointTarget and controllerTarget will set before this is called
    // (they are set to the controller and endpoint that threw the error)
    apiError.response.status(500);

    return {
      statusCode: 500,
      errorMessage: 'Error getting items for store',
    };
  }
}

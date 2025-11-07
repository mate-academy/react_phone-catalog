import { ErrorObject, Status } from '@server/types';

const errorsMap: Record<number, string> = {
  400: 'Bad Request',
  404: `Page not found`,
  418: `I'm a teapot`,
  422: 'Unprocessable Entity',
  500: 'Internal server error',
  501: 'Not Implemented',
};

const createError = (statusCode: number, arg?: string): ErrorObject => {
  return {
    status: Status.ERROR,
    statusCode: statusCode,
    error: errorsMap[statusCode],
    message: arg ?? 'An unknown error occurred',
  };
};

export { createError };

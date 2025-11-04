import { ErrorObject, Status } from '@server/types';

type ErrorData = { error: string; message: (arg: unknown) => string };

const errorsMap: Record<number, ErrorData> = {
  501: {
    error: 'Not Implemented',
    message: arg => `${arg} method is not supported by the server`,
  },
  400: {
    error: 'Bad Request',
    message: arg => `${arg} could not be read properly`,
  },
  422: {
    error: 'Unprocessable Entity',
    message: arg => `${arg} is invalid value`,
  },
  418: {
    error: `I'm a teapot`,
    message: arg => `${arg} impossible. Server is a teapot`,
  },
};

const createError = (statusCode: number, arg: unknown): ErrorObject => {
  const entry = errorsMap[statusCode];

  return {
    status: Status.ERROR,
    statusCode: statusCode,
    error: entry?.error ?? 'Unknown Error',
    message: entry?.message(arg) ?? 'An unknown error occurred',
  };
};

export { createError };

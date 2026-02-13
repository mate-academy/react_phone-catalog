import { ErrorObject } from '@server/types';

const errorsMap: Record<number, string> = {
  400: 'Bad Request',
  404: `Page not found`,
  418: `I'm a teapot`,
  422: 'Unprocessable Entity',
  500: 'Internal server error',
  501: 'Not Implemented',
};

const formError = (
  statusCode: number,
  message: string,
): { ok: false; error: ErrorObject } => {
  return {
    ok: false,
    error: {
      statusCode: statusCode,
      error: errorsMap[statusCode],
      message: message,
    },
  };
};

export { formError };

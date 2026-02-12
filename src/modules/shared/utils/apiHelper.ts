import { NotFoundError, ServerError } from './errorTypes';

export function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function checkResponse(res: Response) {
  if (!res.ok) {
    if (res.status === 404) {
      throw new NotFoundError();
    }

    throw new ServerError(res.status);
  }

  return res;
}

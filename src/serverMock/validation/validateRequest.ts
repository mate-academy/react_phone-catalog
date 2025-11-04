import { createError } from '@server/helpers';
import { methodMap, Methods } from '@server/static';
import { ErrorObject, MethodRequestMap, ValidRequest } from '@server/types';
import { validateBody } from './validateBody';

const validateMethod = (method: unknown): method is Methods => {
  return Object.values(Methods).some(el => el === method);
};

const validateRequest = <M extends Methods>(
  method: M,
  request: unknown,
): request is MethodRequestMap[M] => {
  return methodMap[method].some(el => el === request);
};

export const validate = (
  conf: unknown,
): ValidRequest<Methods> | ErrorObject => {
  if (typeof conf !== 'string') {
    return createError(501, 'no body');
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(conf);
  } catch {
    return createError(501, 'invalid JSON');
  }

  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('method' in parsed) ||
    !('request' in parsed)
  ) {
    return createError(418, '');
  }

  if (!('body' in parsed)) {
    return createError(400, 'request');
  }

  const { method, request, body } = parsed;

  if (!validateMethod(method)) {
    return createError(501, method);
  }

  if (!validateRequest(method, request)) {
    return createError(400, request);
  }

  if (!validateBody[request](body)) {
    return createError(400, request);
  }

  return { method, request, body };
};

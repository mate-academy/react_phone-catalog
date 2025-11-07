import { Methods } from '@server/static';
import { validateRequest } from './validateRequest';
import { createError } from '@server/helpers';

const validateMethod = (method: unknown): method is Methods => {
  return Object.values(Methods).some(el => el === method);
};

export const validate = (conf: unknown) => {
  if (typeof conf !== 'string') {
    return createError(400, 'invalid JSON');
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(conf);
  } catch {
    return createError(400, 'invalid JSON');
  }

  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('method' in parsed) ||
    !('request' in parsed) ||
    !('body' in parsed)
  ) {
    return createError(400, 'invalid JSON');
  }

  const { method, request, body } = parsed;

  if (!validateMethod(method)) {
    return createError(418, `${method} is a teapot`);
  }

  return validateRequest[method](request, body);
};

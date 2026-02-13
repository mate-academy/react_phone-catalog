import { formError } from '@server/helpers';
import { ValidatorResponce } from '@server/types/validator.types';

const isValidObject = (arg: unknown): arg is Record<string, unknown> => {
  if (
    typeof arg !== 'object' ||
    arg === null ||
    Object.keys(arg).some(el => typeof el !== 'string') ||
    Array.isArray(arg)
  ) {
    return false;
  }

  return true;
};

const validateKeys = (
  received: string[],
  expected: string[],
  obligate = true,
): ValidatorResponce => {
  const missingOrUnexpected = obligate
    ? expected.filter(key => !received.includes(key))
    : received.filter(key => !expected.includes(key));

  const message = obligate ? 'Missing required key/s' : 'Unexpected key/s';

  if (missingOrUnexpected.length > 0) {
    return formError(422, `${message}: ${missingOrUnexpected}`);
  }

  return { ok: true };
};

const enumValidator = (test: unknown, values: string[]): ValidatorResponce => {
  if (typeof test !== 'string') {
    return formError(422, `Expected ${test} to be string`);
  }

  if (!values.includes(test as string)) {
    return formError(422, `Expected ${test} to be one of values ${values}`);
  }

  return { ok: true };
};

export { isValidObject, validateKeys, enumValidator };

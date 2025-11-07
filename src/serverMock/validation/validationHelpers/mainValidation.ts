import { createError } from '@server/helpers';

const isValidObject = (arg: unknown) => {
  if (!(typeof arg === 'object' && arg !== null)) {
    return createError(400, 'Invalid request body: expected JSON object');
  }

  return true;
};

const validKeyLength = (
  arg: Record<string, unknown>,
  keysObligate: number,
  keysOptional: number,
) => {
  const amount = Object.keys(arg).length;
  const check =
    keysOptional > 0
      ? amount > keysObligate && amount <= keysObligate + keysOptional
      : amount === keysObligate;

  if (!check) {
    return createError(
      400,
      `Invalid object shape: unexpected key number: ${arg}`,
    );
  }

  return true;
};

const validKeys = (
  arg: Record<string, unknown>,
  shapeObject: Record<string, string>,
) => {
  const shapeKeys = Object.keys(shapeObject);
  const check = Object.keys(arg).every(el =>
    shapeKeys.some(template => template === el),
  );

  if (!check) {
    return createError(
      400,
      `Invalid object structure: unknown or missing keys: ${arg}`,
    );
  }

  return true;
};

const validValueTypes = (
  arg: Record<string, unknown>,
  shapeObject: Record<string, string>,
) => {
  for (const [key, value] of Object.entries(arg)) {
    const expectedType = shapeObject[key];

    if (expectedType === 'number') {
      if (!(typeof value === 'number' && Number.isFinite(value) && value > 0)) {
        return createError(
          422,
          `Invalid type for "${key}": expected positive number`,
        );
      }

      continue;
    }

    if (expectedType === 'array') {
      if (!Array.isArray(value)) {
        return createError(422, `Invalid type for "${key}": expected array`);
      }

      continue;
    }

    if (expectedType === 'object') {
      if (
        !(typeof value === 'object' && value !== null && !Array.isArray(value))
      ) {
        return createError(422, `Invalid type for "${key}": expected object`);
      }

      continue;
    }

    if (typeof value !== expectedType) {
      return createError(
        422,
        `Invalid type for "${key}": expected ${expectedType}`,
      );
    }
  }

  return true;
};

export { isValidObject, validKeyLength, validKeys, validValueTypes };

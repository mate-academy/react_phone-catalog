import { ValidationCheck, ValidationResult } from '../../types';

const isValidObject = (arg: unknown): ValidationResult<true> => {
  if (!(typeof arg === 'object' && arg !== null)) {
    return {
      ok: false,
      value: [400, 'Invalid request body: expected JSON object'],
    };
  }

  return { ok: true, value: true };
};

const validKeyLength = (
  arg: Record<string, unknown>,
  keysObligate: number,
  keysOptional: number,
): ValidationCheck => {
  const amount = Object.keys(arg).length;
  const check =
    keysOptional > 0
      ? amount > keysObligate && amount <= keysObligate + keysOptional
      : amount === keysObligate;

  if (!check) {
    return {
      ok: false,
      value: [400, `Invalid object shape: unexpected key number: ${arg}`],
    };
  }

  return { ok: true };
};

const validKeys = (
  arg: Record<string, unknown>,
  shapeObject: Record<string, string>,
): ValidationCheck => {
  const shapeKeys = Object.keys(shapeObject);
  const check = Object.keys(arg).every(el =>
    shapeKeys.some(template => template === el),
  );

  if (!check) {
    return {
      ok: false,
      value: [400, `Invalid object structure: unknown or missing keys: ${arg}`],
    };
  }

  return { ok: true };
};

const validValueTypes = (
  arg: Record<string, unknown>,
  shapeObject: Record<string, string>,
): ValidationCheck => {
  for (const [key, value] of Object.entries(arg)) {
    const expectedType = shapeObject[key];

    if (expectedType === 'number') {
      if (!(typeof value === 'number' && Number.isFinite(value))) {
        return {
          ok: false,
          value: [422, `Invalid type for "${key}": expected number`],
        };
      }

      continue;
    }

    if (expectedType === 'array') {
      if (!Array.isArray(value)) {
        return {
          ok: false,
          value: [422, `Invalid type for "${key}": expected array`],
        };
      }

      continue;
    }

    if (expectedType === 'object') {
      if (
        !(typeof value === 'object' && value !== null && !Array.isArray(value))
      ) {
        return {
          ok: false,
          value: [422, `Invalid type for "${key}": expected object`],
        };
      }

      continue;
    }

    if (typeof value !== expectedType) {
      return {
        ok: false,
        value: [422, `Invalid type for "${key}": expected ${expectedType}`],
      };
    }
  }

  return { ok: true };
};

export { isValidObject, validKeyLength, validKeys, validValueTypes };

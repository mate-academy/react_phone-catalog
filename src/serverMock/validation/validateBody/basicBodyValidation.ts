import { ValidationCheck } from '@server/types';
import {
  isValidObject,
  validKeyLength,
  validKeys,
  validValueTypes,
} from '../validationHelpers';

const basicValidation = (
  arg: unknown,
  shapeObject: Record<string, string>,
  optionalShapeObject?: Record<string, string>,
): ValidationCheck => {
  const isObject = isValidObject(arg);

  if (!isObject.ok) {
    return isObject;
  }

  const testObj = { ...shapeObject, ...optionalShapeObject };
  const obligateLength = Object.keys(shapeObject).length;
  const optionalLength = optionalShapeObject
    ? Object.keys(optionalShapeObject).length
    : 0;

  const isValidLength = validKeyLength(
    arg as Record<string, unknown>,
    obligateLength,
    optionalLength,
  );

  if (!isValidLength.ok) {
    return isValidLength;
  }

  const haveValidKeys = validKeys(arg as Record<string, unknown>, testObj);

  if (!haveValidKeys.ok) {
    return haveValidKeys;
  }

  const validValTypes = validValueTypes(
    arg as Record<string, unknown>,
    testObj,
  );

  if (!validValTypes) {
    return validValTypes;
  }

  return { ok: true };
};

export { basicValidation };

import { isValidObject, validKeyLength, validKeys, validValueTypes } from '.';

const basicValidation = (
  arg: unknown,
  shapeObject: Record<string, string>,
  optionalShapeObject?: Record<string, string>,
) => {
  const isObject = isValidObject(arg);

  if (isObject !== true) {
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

  if (isValidLength !== true) {
    return isValidLength;
  }

  const haveValidKeys = validKeys(arg as Record<string, unknown>, testObj);

  if (haveValidKeys !== true) {
    return haveValidKeys;
  }

  const validValTypes = validValueTypes(
    arg as Record<string, unknown>,
    testObj,
  );

  if (validValTypes !== true) {
    return validValTypes;
  }

  return true;
};

export { basicValidation };

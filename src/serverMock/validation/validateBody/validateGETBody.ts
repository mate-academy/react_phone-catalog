import { ItemsOnPage, OrderParams, ServerCategory } from '@server/static';
import {
  ValidAmountBody,
  ValidationResult,
  ValidCatalogueBody,
  ValidProdBody,
} from '@server/types';
import { isValidObject } from '../validationHelpers';
import { basicValidation } from './basicBodyValidation';

const catalogueValidators = {
  itemType: (value: unknown): value is ServerCategory =>
    Object.values(ServerCategory).some(el => el === value),
  sort: (value: unknown): value is OrderParams =>
    Object.values(OrderParams).some(el => el === value),
  perPage: (value: unknown): value is ItemsOnPage =>
    Object.values(ItemsOnPage).some(el => el === value),
  page: (value: unknown): value is number =>
    typeof value === 'number' && value > 0,
};

const validShapes = {
  catalogue: {
    itemType: 'string',
    sort: 'string',
    perPage: 'string',
    page: 'number',
  },
  prod: {
    itemId: 'string',
  },
  amount: {
    category: 'string',
  },
};

const validateCatalogueBody = (
  arg: unknown,
): ValidationResult<ValidCatalogueBody> => {
  const basicValidated = basicValidation(arg, validShapes.catalogue);

  if (!basicValidated.ok) {
    return basicValidated;
  }

  const validValues = Object.entries(catalogueValidators).every(
    ([key, validator]) => validator((arg as Record<string, unknown>)[key]),
  );

  if (!validValues) {
    return {
      ok: false,
      value: [422, `Invalid field values: ${arg}`],
    };
  }

  return { ok: true, value: arg as ValidCatalogueBody };
};

const validateProdBody = (arg: unknown): ValidationResult<ValidProdBody> => {
  const basicValidated = basicValidation(arg, validShapes.prod);

  if (!basicValidated.ok) {
    return basicValidated;
  }

  const { itemId } = arg as Record<'itemId', unknown>;
  const safeIdPattern = /^[a-zA-Z0-9_-]+$/;

  if (
    typeof itemId !== 'string' ||
    itemId.length === 0 ||
    itemId.length > 50 ||
    !safeIdPattern.test(itemId)
  ) {
    return {
      ok: false,
      value: [422, `Invalid field values: ${arg}`],
    };
  }

  return {
    ok: true,
    value: arg as ValidProdBody,
  };
};

const validateBannerBody = (arg: unknown): ValidationResult<{}> => {
  const isObject = isValidObject(arg);

  if (!isObject.ok) {
    return isObject;
  }

  return Object.keys(arg as object).length !== 0
    ? { ok: false, value: [422, `Invalid field number+: ${arg}`] }
    : { ok: true, value: {} };
};

const validateAmountBody = (
  arg: unknown,
): ValidationResult<ValidAmountBody> => {
  const basicValidated = basicValidation(arg, validShapes.catalogue);

  if (!basicValidated.ok) {
    return basicValidated;
  }

  return Object.values(ServerCategory).some(
    el => el === ((arg as Record<string, unknown>).category as string),
  )
    ? { ok: true, value: arg as ValidAmountBody }
    : { ok: false, value: [422, `Invalid field value: ${arg}`] };
};

export {
  validateCatalogueBody,
  validateProdBody,
  validateBannerBody,
  validateAmountBody,
};

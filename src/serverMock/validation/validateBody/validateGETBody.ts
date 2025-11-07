import { ItemsOnPage, OrderParams, ServerCategory } from '@server/static';
import { isValidObject, basicValidation } from '../validationHelpers';
import { createError } from '@server/helpers';
import {
  getAmount,
  getBanners,
  getCatalogueItems,
  getProduct,
} from '@server/services/GET';
import {
  ValidAmountBody,
  ValidCatalogueBody,
  ValidProdBody,
} from '@server/types';

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

const validateCatalogueBody = (arg: unknown) => {
  const basicValidated = basicValidation(arg, validShapes.catalogue);

  if (basicValidated !== true) {
    return basicValidated;
  }

  const validValues = Object.entries(catalogueValidators).every(
    ([key, validator]) => validator((arg as Record<string, unknown>)[key]),
  );

  if (!validValues) {
    return createError(422, `Invalid field values: ${arg}`);
  }

  return getCatalogueItems(arg as ValidCatalogueBody);
};

const validateProdBody = (arg: unknown) => {
  const basicValidated = basicValidation(arg, validShapes.prod);

  if (basicValidated !== true) {
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
    return createError(422, `Invalid field values: ${arg}`);
  }

  return getProduct(arg as ValidProdBody);
};

const validateBannerBody = (arg: unknown) => {
  const isObject = isValidObject(arg);

  if (isObject !== true) {
    return isObject;
  }

  return Object.keys(arg as object).length !== 0
    ? createError(422, `Invalid field number+: ${arg}`)
    : getBanners();
};

const validateAmountBody = (arg: unknown) => {
  const basicValidated = basicValidation(arg, validShapes.catalogue);

  if (basicValidated !== true) {
    return basicValidated;
  }

  return Object.values(ServerCategory).some(
    el => el === ((arg as Record<string, unknown>).category as string),
  )
    ? getAmount(arg as ValidAmountBody)
    : createError(422, `Invalid field value: ${arg}`);
};

export {
  validateCatalogueBody,
  validateProdBody,
  validateBannerBody,
  validateAmountBody,
};

import { ItemsOnPage, OrderParams, ServerCategory } from '@server/static';
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

const validateCatalogueBody = (
  params: unknown,
): params is ValidCatalogueBody => {
  if (!params || typeof params !== 'object') {
    return false;
  }

  return (
    Object.entries(catalogueValidators) as [
      keyof typeof catalogueValidators,
      (value: unknown) => boolean,
    ][]
  ).every(([key, validator]) =>
    validator((params as Record<string, unknown>)[key]),
  );
};

const validateProdBody = (params: unknown): params is ValidProdBody => {
  if (typeof params !== 'object' || params === null || !('itemId' in params)) {
    return false;
  }

  const { itemId } = params;
  const safeIdPattern = /^[a-zA-Z0-9_-]+$/;

  if (
    typeof itemId !== 'string' ||
    itemId.length === 0 ||
    itemId.length > 50 ||
    !safeIdPattern.test(itemId)
  ) {
    return false;
  }

  return true;
};

const validateBannerBody = (params: unknown): params is {} => {
  if (
    typeof params !== 'object' ||
    params === null ||
    Object.entries(params).length !== 0
  ) {
    return false;
  }

  return true;
};

const validateAmountBody = (params: unknown): params is ValidAmountBody => {
  return (
    typeof params === 'object' &&
    params !== null &&
    'category' in params &&
    Object.values(ServerCategory).some(el => el === params.category)
  );
};

export {
  validateCatalogueBody,
  validateProdBody,
  validateBannerBody,
  validateAmountBody,
};

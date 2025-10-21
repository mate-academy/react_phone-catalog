/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ItemsOnPage,
  OrderParams,
  RequestType,
  ServerCategory,
} from '@server/types';

const catalogueValidators = {
  itemType: (value: any) => Object.values(ServerCategory).includes(value),
  sort: (value: any) => Object.values(OrderParams).includes(value),
  perPage: (value: any) => Object.values(ItemsOnPage).includes(value),
  page: (value: any) => typeof value === 'number' && value > 0,
};

const validateCatalogueParams = (params: any): boolean => {
  return Object.entries(catalogueValidators).every(([key, validator]) =>
    validator(params[key]),
  );
};

const validateBannerParams = (params: any): boolean => {
  return !params;
};

const validateProdParams = (params: any): boolean => {
  if (typeof params !== 'object' || !Object.hasOwn(params, 'itemId')) {
    return false;
  }

  const { itemId } = params;

  if (typeof itemId !== 'string') {
    return false;
  }

  if (itemId.length === 0 || itemId.length > 50) {
    return false;
  }

  const safeIdPattern = /^[a-zA-Z0-9_-]+$/;

  return safeIdPattern.test(itemId);
};

const validateAmountParams = (params: any): boolean => {
  return Object.values(ServerCategory).some(el => el === params.category);
};

const validate: Record<RequestType, (params: any) => boolean> = {
  [RequestType.CATALOGUE]: validateCatalogueParams,
  [RequestType.PRODUCT]: validateProdParams,
  [RequestType.BANNER]: validateBannerParams,
  [RequestType.AMOUNT]: validateAmountParams,
};

export { validate };

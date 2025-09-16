/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch } from '@server/helpers';
import { ApiEndpoint } from '@server/static';
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

const validateCatalogueParams = async (params: any): Promise<boolean> => {
  return Object.entries(catalogueValidators).every(([key, validator]) =>
    validator(params[key]),
  );
};

const validateBannerParams = async (params: any): Promise<boolean> => {
  return !params;
};

const validateProdParams = async (params: any): Promise<boolean> => {
  return (await apiFetch(ApiEndpoint.ITEMS)).some(
    el => el.id === params.itemId,
  );
};

const validateAmountParams = async (params: any): Promise<boolean> => {
  return Object.values(ServerCategory).some(el => el === params.category);
};

const validate: Record<RequestType, (params: any) => Promise<boolean>> = {
  [RequestType.CATALOGUE]: validateCatalogueParams,
  [RequestType.PRODUCT]: validateProdParams,
  [RequestType.BANNER]: validateBannerParams,
  [RequestType.AMOUNT]: validateAmountParams,
};

export { validate };

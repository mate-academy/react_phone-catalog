import { CartRequestTypes, GetRequestTypes, Methods } from '@server/static';
import { createError } from '@server/helpers';
import {
  validateAmountBody,
  validateBannerBody,
  validateCatalogueBody,
  validateProdBody,
} from './validateBody/validateGETBody';
import {
  validateCartBody,
  validateCheckoutBody,
} from './validateBody/validateCARTBody';

const validateGet = {
  [GetRequestTypes.CATALOGUE]: validateCatalogueBody,
  [GetRequestTypes.PRODUCT]: validateProdBody,
  [GetRequestTypes.BANNER]: validateBannerBody,
  [GetRequestTypes.AMOUNT]: validateAmountBody,
};

const validateCart = {
  [CartRequestTypes.CART]: validateCartBody,
  [CartRequestTypes.CHECKOUT]: validateCheckoutBody,
};

const isCartRequest = (request: unknown): request is CartRequestTypes => {
  return typeof request === 'string' && request in CartRequestTypes;
};

const isGetRequest = (request: unknown): request is GetRequestTypes => {
  return typeof request === 'string' && request in GetRequestTypes;
};

const validateRequest = {
  [Methods.GET]: (request: unknown, body: unknown) => {
    if (!isGetRequest(request)) {
      return createError(418, `${request} is a teapot`);
    }

    return validateGet[request](body);
  },
  [Methods.CART]: (request: unknown, body: unknown) => {
    if (!isCartRequest(request)) {
      return createError(418, `${request} is a teapot`);
    }

    return validateCart[request](body);
  },
};

export { validateRequest };

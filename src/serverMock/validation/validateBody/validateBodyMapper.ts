import { CartRequestTypes, GetRequestTypes } from '@server/static';
import {
  validateAmountBody,
  validateBannerBody,
  validateCartBody,
  validateCatalogueBody,
  validateCheckoutBody,
  validateProdBody,
} from '.';

const validateBody = {
  [GetRequestTypes.CATALOGUE]: validateCatalogueBody,
  [GetRequestTypes.PRODUCT]: validateProdBody,
  [GetRequestTypes.BANNER]: validateBannerBody,
  [GetRequestTypes.AMOUNT]: validateAmountBody,
  [CartRequestTypes.CART]: validateCartBody,
  [CartRequestTypes.CHECKOUT]: validateCheckoutBody,
};

export { validateBody };

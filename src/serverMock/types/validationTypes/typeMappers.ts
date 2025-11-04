import {
  ValidAmountBody,
  ValidCartBody,
  ValidCatalogueBody,
  ValidCheckoutBody,
  ValidProdBody,
} from '.';
import { CartRequestTypes, GetRequestTypes, Methods } from '../../static';

type MethodRequestMap = {
  [Methods.GET]: GetRequestTypes;
  [Methods.CART]: CartRequestTypes;
};

type BodyRequestMap = {
  [GetRequestTypes.CATALOGUE]: ValidCatalogueBody;
  [GetRequestTypes.PRODUCT]: ValidProdBody;
  [GetRequestTypes.BANNER]: {};
  [GetRequestTypes.AMOUNT]: ValidAmountBody;
  [CartRequestTypes.CART]: ValidCartBody;
  [CartRequestTypes.CHECKOUT]: ValidCheckoutBody;
};

export { type MethodRequestMap, type BodyRequestMap };

import { MethodRequestMap } from '@server/types';

enum Methods {
  GET = 'get',
  CART = 'cart',
}

enum RequestType {
  CATALOGUE = 'catalogue',
  PRODUCT = 'product',
  BANNER = 'banner',
  AMOUNT = 'amount',
  CART = 'cart',
  CHECKOUT = 'checkout',
}

enum GetRequestTypes {
  CATALOGUE = 'catalogue',
  PRODUCT = 'product',
  BANNER = 'banner',
  AMOUNT = 'amount',
}

enum CartRequestTypes {
  CART = 'cart',
  CHECKOUT = 'checkout',
}

enum OrderParams {
  NONE = 'none',
  AGE = 'age',
  TITLE = 'title',
  PRICE_ASC = 'price',
  FULL_PRICE_DECS_PROMO = 'hotPrice',
}

enum ItemsOnPage {
  ALL = 'all',
  FOUR = '4',
  EIGHT = '8',
  SIXTEEN = '16',
}

const methodMap: {
  [M in Methods]: MethodRequestMap[M][];
} = {
  [Methods.GET]: [
    GetRequestTypes.CATALOGUE,
    GetRequestTypes.PRODUCT,
    GetRequestTypes.BANNER,
    GetRequestTypes.AMOUNT,
  ],
  [Methods.CART]: [CartRequestTypes.CART, CartRequestTypes.CHECKOUT],
};

export {
  Methods,
  RequestType,
  GetRequestTypes,
  CartRequestTypes,
  OrderParams,
  ItemsOnPage,
  methodMap,
};

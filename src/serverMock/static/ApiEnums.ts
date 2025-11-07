enum Methods {
  GET = 'get',
  CART = 'cart',
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

export { Methods, GetRequestTypes, CartRequestTypes, OrderParams, ItemsOnPage };

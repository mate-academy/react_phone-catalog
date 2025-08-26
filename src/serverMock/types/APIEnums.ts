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

enum RequestType {
  CATALOGUE = 'catalogue',
  PRODUCT = 'product',
  BANNER = 'banner',
  AMOUNT = 'amount',
}

enum CategoryParams {
  ALL = 'all',
  ACCESSORIES = 'accessories',
  PHONES = 'phones',
  TABLETS = 'tablets',
}

export { OrderParams, ItemsOnPage, RequestType, CategoryParams };

enum Category {
  ACCESSORIES = 'accessories',
  PHONES = 'phones',
  TABLETS = 'tablets',
  ALL = 'all',
}

enum ItemsAmount {
  ALL = 'all',
  FOUR = '4',
  EIGHT = '8',
  SIXTEEN = '16',
}

enum Request {
  CATALOGUE = 'catalogue',
  PRODUCT = 'product',
  BANNER = 'banner',
  AMOUNT = 'amount',
}

enum Order {
  NONE = 'none',
  AGE = 'age',
  TITLE = 'title',
  PRICE_ASC = 'price',
  FULL_PRICE_DECS_PROMO = 'hotPrice',
}

enum ResponseStatus {
  ERROR = 'error',
  SUCCESS = 'success',
}

export { Category, ItemsAmount, Request, Order, ResponseStatus };

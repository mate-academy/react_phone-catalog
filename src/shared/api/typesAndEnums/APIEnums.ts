enum Category {
  ALL = 'all',
  ACCESSORIES = 'accessories',
  PHONES = 'phones',
  TABLETS = 'tablets',
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
  AGE = 'age',
  TITLE = 'title',
  PRICE_ASC = 'price',
  FULL_PRICE_DECS_PROMO = 'hotPrice',
}

export { Category, ItemsAmount, Request, Order };

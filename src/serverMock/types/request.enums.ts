enum Methods {
  GET = 'get',
  POST = 'post',
}

enum GetRequests {
  CATALOGUE = 'catalogue',
  PRODUCT = 'product',
  BANNER = 'banner',
  AMOUNT = 'amount',
  CART = 'cart',
}

enum PostRequests {
  CHECKOUT = 'checkout',
}

enum ProductCategory {
  ALL = 'all',
  ACCESSORIES = 'accessories',
  PHONES = 'phones',
  TABLETS = 'tablets',
}

enum SortParams {
  NONE = 'none',
  AGE = 'age',
  TITLE = 'title',
  PRICE_ASC = 'price',
  FULL_PRICE_DECS_PROMO = 'hotPrice',
}

enum PerPage {
  ALL = 'all',
  FOUR = '4',
  EIGHT = '8',
  SIXTEEN = '16',
}

enum DeliveryTypes {
  PICKUP = 'pickup',
  DPD = 'dpd',
  UPS = 'ups standard',
}

enum EdgeCasesKeys {
  CART_ITEMS = 'cartItems',
  CATEGORY = 'category',
  SORT = 'sort',
  PER_PAGE = 'perPage',
  PAGE = 'page',
  USER_DETAILS = 'userDetails',
  DELIVERY_DETAILS = 'deliveryDetails',
  BIRTHDAY = 'birthday',
}

export {
  Methods,
  GetRequests,
  PostRequests,
  ProductCategory,
  SortParams,
  PerPage,
  DeliveryTypes,
  EdgeCasesKeys,
};

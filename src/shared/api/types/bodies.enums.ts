enum SortOrder {
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

enum Months {
  JAN = 1,
  FEB = 2,
  MAR = 3,
  APR = 4,
  MAY = 5,
  JUN = 6,
  JUL = 7,
  AUG = 8,
  SEP = 9,
  OCT = 10,
  NOV = 11,
  DEC = 12,
}

export { SortOrder, PerPage, DeliveryTypes, Months };

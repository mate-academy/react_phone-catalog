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
  JAN = 'january',
  FEB = 'february',
  MAR = 'march',
  APR = 'april',
  MAY = 'may',
  JUN = 'june',
  JUL = 'july',
  AUG = 'august',
  SEP = 'september',
  OCT = 'october',
  NOV = 'november',
  DEC = 'december',
}

export { SortOrder, PerPage, DeliveryTypes, Months };

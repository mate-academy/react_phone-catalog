enum ServerCategory {
  ALL = 'all',
  ACCESSORIES = 'accessories',
  PHONES = 'phones',
  TABLETS = 'tablets',
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

const days: Record<Months, number> = {
  [Months.JAN]: 31,
  [Months.FEB]: 29,
  [Months.MAR]: 31,
  [Months.APR]: 30,
  [Months.MAY]: 31,
  [Months.JUN]: 30,
  [Months.JUL]: 31,
  [Months.AUG]: 31,
  [Months.SEP]: 30,
  [Months.OCT]: 31,
  [Months.NOV]: 30,
  [Months.DEC]: 31,
};

export { ServerCategory, DeliveryTypes, Months, days };

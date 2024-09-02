import { Phone } from '../types/types';

export enum Sort {
  newest = 'Newest',
  alphabetically = 'Alphabetically',
  cheapest = 'Cheapest',
}

export function getVisiablePhones(products: Phone[], sort: Sort) {
  const preparedProducts = [...products];

  return preparedProducts.sort((phone1, phone2) => {
    switch (sort) {
      case Sort.newest:
        return phone2.priceRegular - phone1.priceRegular;
      case Sort.alphabetically:
        return phone1.id.localeCompare(phone2.id);
      case Sort.cheapest:
        return phone1.priceDiscount - phone2.priceDiscount;
      default:
        return phone1.priceRegular - phone2.priceRegular;
    }
  });
}

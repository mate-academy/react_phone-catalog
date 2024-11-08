import { TProduct } from '@utils/types/product.type';

import { convertToMB } from './workWithText';

export const getMostExpensiveProduct = (products: TProduct[]) =>
  [...products].sort((a, b) => b.price - a.price);

export const getProductWithLargestDiscount = (products: TProduct[]) =>
  [...products].sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

export const getProductsSortedByYearAndStorage = (products: TProduct[]) =>
  [...products].sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year;
    }

    if (b.fullPrice !== a.fullPrice) {
      return b.fullPrice - a.fullPrice;
    }

    return parseInt(b.capacity) - parseInt(a.capacity);
  });

export const applySorting = (items: TProduct[], sortBy: string): TProduct[] =>
  [...items].sort((a, b) => {
    switch (sortBy) {
      case 'year':
        return b.year - a.year;
      case 'fullPrice':
        return b.fullPrice - a.fullPrice;
      case 'smallPrice':
        return a.fullPrice - b.fullPrice;
      case 'price': {
        const discountA = a.fullPrice - a.price;
        const discountB = b.fullPrice - b.price;
        return discountB - discountA;
      }
      case 'screen': {
        const screenA = parseFloat(a.screen);
        const screenB = parseFloat(b.screen);
        return screenB - screenA;
      }
      case 'name': {
        return a.name.localeCompare(b.name);
      }
      case 'capacity': {
        return parseInt(b.capacity) - parseInt(a.capacity);
      }
      case 'ram': {
        return convertToMB(b.ram) - convertToMB(a.ram);
      }
      default:
        return 0;
    }
  });

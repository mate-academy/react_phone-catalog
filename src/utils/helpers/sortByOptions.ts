import { TProduct } from '@utils/types/product.type';
import { convertToMB } from './convertToMB';

export const applySorting = (item: TProduct[], sortBy: string): TProduct[] => {
  return item.sort((a, b) => {
    switch (sortBy) {
      case 'year':
        return b.year - a.year;
      case 'fullPrice':
        return b.fullPrice - a.fullPrice;
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
      case 'capacity': {
        const capacityA = parseInt(a.capacity);
        const capacityB = parseInt(b.capacity);
        return capacityB - capacityA;
      }
      case 'ram': {
        const ramA = convertToMB(a.ram);
        const ramB = convertToMB(b.ram);
        return ramB - ramA;
      }
      default:
        return 0;
    }
  });
};

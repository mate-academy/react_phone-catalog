import { Item } from '../types/Item';
import { PageItems } from '../types/others/types';

export const getLinkTypeByProduct
  = (product: Item): PageItems => {
    switch (product.type) {
      case 'phone':
        return 'Phones';
      case 'tablet':
        return 'Tablets';
      case 'accessory':
        return 'Accessories';
      default:
        return '/';
    }
  };

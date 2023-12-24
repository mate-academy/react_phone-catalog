import { Item } from '../types/Item';

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

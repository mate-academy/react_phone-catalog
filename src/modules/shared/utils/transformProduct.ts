import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const transformToProduct = (item: Product | ProductDetails): Product => {
  if ('images' in item) {
    return {
      id: item.id,
      itemId: item.id,
      name: item.name,
      category: item.category,
      price: item.priceDiscount || item.priceRegular,
      fullPrice: item.priceRegular,
      screen: item.screen,
      capacity: item.capacity,
      color: item.color,
      ram: item.ram,
      image: item.images[0],
    };
  }

  return item;
};

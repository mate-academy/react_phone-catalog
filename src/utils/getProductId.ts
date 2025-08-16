import { Product } from '../types/Product';
import { ProductDetailed } from '../types/ProductDetailed';

export const getProductId = (product: Product | ProductDetailed): string => {
  return 'itemId' in product ? product.itemId : product.id;
};

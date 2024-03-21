import { CartItemType } from '../types/CartItemType';
import { Product } from '../types/Product';

export const checkIsInList = (
  productId: string,
  list: (Product | CartItemType)[],
) => list.find(p => p.id === productId);

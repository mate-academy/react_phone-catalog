import { Item, ItemType } from '../types/Item';

export const getProductsByType = (products: Item[], type: ItemType) => {
  return products.filter((product) => product.type === type);
};

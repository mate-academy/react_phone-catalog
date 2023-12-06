import { Item } from '../types/Item';

export const getBrandNewModels = (products: Item[]) => {
  const newProducts = products.filter((product) => !product.discount);

  newProducts.sort((a, b) => b.price - a.price);

  return newProducts;
};

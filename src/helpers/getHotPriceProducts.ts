import { Item } from '../types/Item';

export const getHotPriceProducts = (products: Item[]) => {
  const newProducts = products.filter((product) => product.discount);

  newProducts.sort((a, b) => b.price * b.discount - a.price * a.discount);

  return newProducts;
};

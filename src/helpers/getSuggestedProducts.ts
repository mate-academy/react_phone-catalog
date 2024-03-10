import { ProductExtended } from '../types/ProductExtended';

export const getSuggestedProducts = (
  products: ProductExtended[],
  id: string,
) => {
  const result = [...products].filter(product => product.itemId !== id);
  const index = Math.floor(Math.random() * (result.length - 10));

  return result.slice(index, index + 10);
};

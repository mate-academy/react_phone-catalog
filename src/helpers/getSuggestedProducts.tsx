import { UpgratedProduct } from '../types/UpgratedProduct';

export const getSuggestedProducts = (
  products: UpgratedProduct[],
  id: string,
) => {
  const newProducts = [...products].filter(product => product.itemId !== id);
  const index = Math.floor(Math.random() * (newProducts.length - 10));

  return newProducts.slice(index, index + 10);
};

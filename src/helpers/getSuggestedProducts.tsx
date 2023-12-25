import { UpgradedProduct } from '../types/UpgradedProduct';

export const getSuggestedProducts = (
  products: UpgradedProduct[],
  id: string,
) => {
  const newProducts = [...products].filter(
    product => product.itemId !== id,
  );

  const index = Math.floor(Math.random() * (newProducts.length - 10));

  return newProducts.slice(index, index + 10);
};

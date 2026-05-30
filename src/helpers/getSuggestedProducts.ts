import { Product } from '../types/Product';

export const getSuggestedProducts = (products: Product[], id: string) => {
  const newProducts = id
    ? [...products].filter(product => product.itemId !== id)
    : [...products];

  if (newProducts.length <= 10) {
    return newProducts;
  }

  const index = Math.max(
    0,
    Math.floor(Math.random() * (newProducts.length - 10)),
  );

  return newProducts.slice(index, index + 10);
};

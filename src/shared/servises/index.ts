import { Product } from '../types/Product';

export const getBrandNewProducts = (products: Product[]) => {
  return [...products]
    .filter(product => product.year === 2022)
    .sort((product1, product2) => product2.year - product1.year);
};

export const getHotPriceProducts = (products: Product[]) => {
  return [...products].sort(
    (product1, product2) =>
      product2.fullPrice -
      product2.price -
      (product1.fullPrice - product1.price),
  );
};

export const getSuggestedProducts = (products: Product[], id: string) => {
  const newProducts = [...products].filter(product => product.itemId !== id);
  const index = Math.floor(Math.random() * (newProducts.length - 10));

  return newProducts.slice(index, index + 10);
};

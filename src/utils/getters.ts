import { Product } from '../types/Product';

export const getNewModels = (category: string, currentProducts: Product[]) => {
  const newProducts = currentProducts.filter(
    product => product.category === category,
  );

  newProducts.sort((product1: Product, product2: Product) => {
    return Number(product2.year) - Number(product1.year);
  });

  if (!newProducts.length) {
    return [];
  }

  const currentYear = Number(newProducts[0].year);

  return newProducts.filter(
    newProduct => Number(newProduct.year) === currentYear,
  );
};

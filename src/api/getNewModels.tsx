import { Product } from 'src/types/Product';

export const getNewModels = (products: Product[]) => {
  const sortedProductsByAge = [...products].sort((product1, product2) => {
    return product2.year - product1.year;
  });

  return sortedProductsByAge.slice(0, 8);
};

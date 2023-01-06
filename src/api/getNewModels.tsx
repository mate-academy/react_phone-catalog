import { Product } from 'src/types/Product';

export const getNewModels = (products: Product[]) => {
  const sortedProductsByAge = [...products].sort((product1, product2) => {
    return product1.year - product2.year;
  });

  return sortedProductsByAge.slice(0, 8);
};

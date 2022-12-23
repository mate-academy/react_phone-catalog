import { Product } from 'src/types/Product';

export const getNewModels = (products: Product[]) => {
  const sortedProductsByAge = [...products].sort((product1, product2) => {
    return product1.age - product2.age;
  });

  return sortedProductsByAge.slice(0, 8);
};

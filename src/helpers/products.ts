import { Product } from '../types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getHotPriceProducts = () => {
  return getProducts()
    .then((products: Product[]) => {
      return [...products]
        .sort((prod1, prod2) => {
          const discoutValue1 = (prod1.fullPrice - prod1.price);
          const discoutValue2 = (prod2.fullPrice - prod2.price);

          return discoutValue2 - discoutValue1;
        });
    });
};

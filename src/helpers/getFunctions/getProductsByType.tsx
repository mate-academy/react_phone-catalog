import { Product } from '../../types/Product';

export const getProductsByType = (
  productsFromServer: Product[],
  type: string,
) => {
  return productsFromServer.filter(product => (
    product.category === type
  ));
};

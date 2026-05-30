import { DetailsProduct } from '../types/productTypes';

export const findProductById = (
  products: DetailsProduct[],
  id: string | undefined,
) => {
  return products.find(product => product.id === id);
};

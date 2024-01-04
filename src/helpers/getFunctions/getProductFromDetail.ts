import { ProductType } from '../types/ProductType';

export const getPruductFromDetail = (products: ProductType[], id: string) => {
  return products.filter(prod => prod.itemId === id)[0];
};

import { Product } from '../types/Product';

export const getTotalAmount = (products: Product[]) => {
  return products.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );
};

import { CartElement } from '../types/CartElement';
// import type { Product } from '../types/Product';

export const calculateTotalSum = (productList: CartElement[]) => {
  // const prices: number[] = productList.map(i => i.price);

  return productList.reduce(
    (sum, productItem) =>
      sum + productItem.product.price * productItem.quantity,
    0,
  );
};

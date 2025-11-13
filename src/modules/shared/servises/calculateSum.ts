import { CartElement } from '../types/CartElement';

export const calculateTotalSum = (productList: CartElement[]) => {
  return productList.reduce(
    (sum, productItem) =>
      sum + productItem.product.price * productItem.quantity,
    0,
  );
};

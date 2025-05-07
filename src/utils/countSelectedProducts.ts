import { ProductWithQuantity } from '../types/ProductWithQuantity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const countSelectedProducts = (
  selectedProducts: ProductWithQuantity[],
): number => {
  const countProducts = selectedProducts.reduce((prev, item) => {
    return prev + (item.quantity ?? 0);
  }, 0);

  return countProducts;
};

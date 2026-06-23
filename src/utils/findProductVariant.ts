import { Product } from '../types/Product';

export const findProductVariant = (
  products: Product[],
  currentProduct: Product,
  color: string,
  capacity: string,
) => {
  return products.find(product => {
    return (
      product.namespaceId === currentProduct.namespaceId &&
      product.color.toLowerCase() === color.toLowerCase() &&
      product.capacity === capacity
    );
  });
};

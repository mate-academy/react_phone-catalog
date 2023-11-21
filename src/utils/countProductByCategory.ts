import { Product } from '../types/Product';
import { ProductType } from '../types/ProductType';

export const countProductByCategory = (
  products: Product[],
  productType: ProductType,
) => {
  return products
    .filter(product => product.type === productType)
    .length;
};

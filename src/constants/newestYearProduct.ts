import products from '../../public/api/products.json';
import { ProductType } from '../types/ProductType';

export const newestYearPhone = Math.max(
  ...products
    .filter(product => product.category === ProductType.phones)
    .map(product => product.year),
);
export const newestYearTablet = Math.max(
  ...products
    .filter(product => product.category === ProductType.tablets)
    .map(product => product.year),
);
export const newestYearAccessories = Math.max(
  ...products
    .filter(product => product.category === ProductType.accessories)
    .map(product => product.year),
);

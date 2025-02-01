import { ProductType } from '../types/ProductType';
import { ProductOtherData } from '../types/Product';

export const newestYearPhone = (products: ProductOtherData[]) => {
  return Math.max(
    ...products
      .filter(product => product.category === ProductType.phones)
      .map(product => product.year),
  );
};

export const newestYearTablet = (products: ProductOtherData[]) => {
  return Math.max(
    ...products
      .filter(product => product.category === ProductType.tablets)
      .map(product => product.year),
  );
};

export const newestYearAccessories = (products: ProductOtherData[]) => {
  return Math.max(
    ...products
      .filter(product => product.category === ProductType.accessories)
      .map(product => product.year),
  );
};

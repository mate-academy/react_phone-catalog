import { Product } from '../types/Product';

export const getPhonesQty = (products: Product[]) => {
  return [...products].filter(product => product.type === 'phone').length;
};

export const getTabletsQty = (products: Product[]) => {
  return [...products].filter(product => product.type === 'tablet').length;
};

export const getAccessoriesQty = (products: Product[]) => {
  return [...products].filter(product => product.type === 'accessory').length;
};

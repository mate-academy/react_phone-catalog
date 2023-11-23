import { Product } from '../Types/Product';

export const getPhonesQuantity = (products:Product[]) => {
  return [...products].filter(product => product.type === 'phone').length;
};

export const getTabletsQuantity = (products:Product[]) => {
  return [...products].filter(product => product.type === 'tablet').length;
};

export const getAccessoriesQuantity = (products:Product[]) => {
  return [...products].filter(product => product.type === 'accessory').length;
};

import { Product } from '../Types/Product';

export const getPhonesList = (products:Product[]) => {
  return [...products].filter(product => product.type === 'phone');
};

export const getTabletsList = (products:Product[]) => {
  return [...products].filter(product => product.type === 'tablet');
};

export const getAccessoriesList = (products:Product[]) => {
  return [...products].filter(product => product.type === 'accessory');
};

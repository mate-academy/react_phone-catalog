import { getData } from '@utils/fetchClient';
import { ProductDetails } from '@sTypes/ProductDetails';

export const getPhones = () => {
  return getData<ProductDetails[]>('/phones.json');
};

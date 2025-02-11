import { getData } from '@utils/fetchClient';
import { ProductDetails } from '@sTypes/ProductDetails';

export const getAccessories = () => {
  return getData<ProductDetails[]>('/accessories.json');
};

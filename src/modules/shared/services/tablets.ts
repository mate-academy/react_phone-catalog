import { getData } from '@utils/fetchClient';
import { ProductDetails } from '@sTypes/ProductDetails';

export const getTablets = () => {
  return getData<ProductDetails[]>('/tablets.json');
};

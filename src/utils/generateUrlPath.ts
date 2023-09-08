import { ProductType } from '../api/getProducts';

export const generateUrlPath = (type: ProductType) => {
  if (type !== ProductType.ACCESSORY) {
    return `${type}s`;
  }

  return 'accessories';
};

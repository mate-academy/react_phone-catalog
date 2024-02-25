import { getData } from '../helpers/fetchClient';
import { ProductDetails } from '../helpers/types/ProductDetails';

export const getProductDetails = (productId: string)
: Promise<ProductDetails> => {
  return getData(`/products/${productId}.json`);
};

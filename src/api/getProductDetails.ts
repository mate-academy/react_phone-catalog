import { getData } from '../helpers/fetchClient';
import { ProductDetails } from '../helpers/types/ProductDetailds';

export const getProductDetails = (productId: string)
: Promise<ProductDetails> => {
  return getData(`/products/${productId}.json`);
};

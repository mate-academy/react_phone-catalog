import { ProductDetails } from '../types/ProductDetails';
import { getData } from '../utils/httpClient';

export const getProductDetails = (productType: string) =>
  getData<ProductDetails[]>(`/${productType}`);

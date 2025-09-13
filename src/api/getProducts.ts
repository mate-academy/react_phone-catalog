import { ProductPreview } from 'types/ProductPreview';
import { client } from '../utils/fetchClient';
import { ProductDetails } from 'types/ProductDetails';

export const getAllProducts = () => {
  return client.get<ProductPreview[]>('api/products.json');
};

export const getCategoryProduct = (category: string) => {
  return client.get<ProductDetails[]>(`api/${category}.json`);
};

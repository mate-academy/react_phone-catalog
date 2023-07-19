import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { client } from '../helpers/fetchClient';

export const getProducts = () => {
  return client.get<Product[]>('.json');
};

export const getProduct = (id: string) => {
  return client.get<ProductDetails>(`/${id}.json`);
};

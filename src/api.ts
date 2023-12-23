import { Phone } from './types/Phone';
import { ProductCardType } from './types/ProductCardType';
import { ProductDetails } from './types/ProductDetails';
import { client } from './utils/fetchClient';

export const getProducts = () => {
  return client.get<Phone[]>('/products.json');
};

export const getProduct = (id: string) => {
  return client.get<ProductDetails>(`/products/${id}.json`);
};

export const getProductCard = (id: string) => {
  return client.get<ProductCardType>(`/products/${id}.json`);
};

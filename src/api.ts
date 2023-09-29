import { client } from './helpers/fetchPhones';
import { Phone } from './types/Phone';
import { ProductDetails } from './types/PhoneDetails';

export const getProducts = () => {
  return client.get<Phone[]>('/products.json');
};

export const getProduct = (id: string) => {
  return client.get<ProductDetails>(`/products/${id}.json`);
};

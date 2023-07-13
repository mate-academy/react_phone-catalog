import { Phone } from '../type/Phone';
import { PhoneInfo } from '../type/PhoneInfo';
import { client } from '../utils/fetchClient';

export const getProducts = async () => {
  return client.get<Phone[]>('/products.json');
};

export const getDescription = async (id: string) => {
  return client.get<PhoneInfo>(`/products/${id}.json`);
};

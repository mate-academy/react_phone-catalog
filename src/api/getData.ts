import { Products } from '../type/Products';
import { PhoneInfo } from '../type/PhoneInfo';
import { client } from '../helpers/fetchClient';

export const getProducts = async () => {
  return client.get<Products[]>('/products.json');
};

export const getDescription = async (id: string) => {
  return client.get<PhoneInfo>(`/products/${id}.json`);
};

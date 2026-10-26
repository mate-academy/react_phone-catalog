import axios from 'axios';
import { Accessories, Phone, Product, Tablet } from '../types/Types';

const client = axios.create({
  baseURL: 'api',
});

const get = async <T>(file: string): Promise<T> => {
  const response = await client.get<T>(`/${file}.json`);

  return response.data;
};

export const getAll = async () => {
  const products = await get<Product[]>('products');
  const phones = await get<Phone[]>('phones');
  const tablets = await get<Tablet[]>('tablets');
  const accessories = await get<Accessories[]>('accessories');

  return {
    products,
    productByCategory: {
      phones,
      tablets,
      accessories,
    },
  };
};

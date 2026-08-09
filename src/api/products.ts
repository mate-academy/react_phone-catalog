import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { BASE_URL } from './index';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}/${url}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${url}`);
  }

  return response.json();
};

export const getProducts = () => getData<Product[]>('products.json');

export const getPhones = () => getData<ProductDetails[]>('phones.json');

export const getTablets = () => getData<ProductDetails[]>('tablets.json');

export const getAccessories = () =>
  getData<ProductDetails[]>('accessories.json');

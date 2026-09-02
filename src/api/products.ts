import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { API_URL } from './index';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${API_URL}${url}`);

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

export const getProduct = async (
  category: string,
  itemId: string,
): Promise<ProductDetails | null> => {
  let data: ProductDetails[] = [];

  switch (category) {
    case 'phones':
      data = await getPhones();
      break;

    case 'tablets':
      data = await getTablets();
      break;

    case 'accessories':
      data = await getAccessories();
      break;

    default:
      return null;
  }

  return data.find(item => item.id === itemId) || null;
};

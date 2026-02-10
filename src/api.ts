import { ProductItem } from './types/ProductItem';
import { Product } from './types/Product';

const BASE_URL = 'https://yahohulia.github.io/react_phone-catalog/api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delay));
}

function get<T>(url: string): Promise<T> {
  const fullURL = BASE_URL + url + '.json';

  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getAccessories = () => get<ProductItem[]>('/accessories');
export const getPhones = () => get<ProductItem[]>('/phones');
export const getTablets = () => get<ProductItem[]>('/tablets');

export const getProduct = () => get<Product[]>('/products');

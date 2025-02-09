import { Gadgets } from '../types/Gadgets';
import { ProductsType } from '../types/Products';

const BASE_URL = '/api';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url + '.json').then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Failed to load data from ${url}`);
  });
}

export const getProducts = () => getData<ProductsType[]>('/products');
export const getCategoryItems = (src: string) => getData<Gadgets[]>(src);

export const getSelectedProduct = (category: string) =>
  getData<Gadgets[]>(`/${category}`);

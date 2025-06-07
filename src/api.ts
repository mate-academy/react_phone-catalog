import { DevicsType } from './types/DeviseType';
import { ProductType } from './types/ProductType';

const BASE_URL = `/api`;

export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}/${endpoint}.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint} data`);
  }

  return response.json();
};

// export const fetchData = async <T>(endpoint: string): Promise<T> => {
//   const response = await fetch(`/${endpoint}.json`);

//   if (!response.ok) {
//     throw new Error(`Failed to fetch ${endpoint} data`);
//   }

//   return response.json();
// };

export const fetchProducts = () => fetchData<ProductType[]>('products');
export const fetchPhones = () => fetchData<DevicsType[]>('phones');
export const fetchTablets = () => fetchData<DevicsType[]>('tablets');
export const fetchAccessories = () => fetchData<DevicsType[]>('accessories');

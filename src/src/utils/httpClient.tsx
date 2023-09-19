import { Product } from '../types/Product';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products';

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const client = {
  async get<T>(): Promise<T> {
    const response = await fetch(`${BASE_URL}.json`);

    return handleResponse(response);
  },
};

export const getProducts = () => client.get<Product[]>();

import { Product } from '../types/Product';
import { ProductDescription } from '../types/ProductDescription';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const client = {
  async get<T>(): Promise<T> {
    const response = await fetch(`${BASE_URL}/products.json`);

    return handleResponse(response);
  },
};

export const getProducts = () => client.get<Product[]>();

export const getProductDetails = async (productId: string)
: Promise<ProductDescription> => {
  const response = await fetch(`${BASE_URL}/products/${productId}.json`);

  return response.json();
};

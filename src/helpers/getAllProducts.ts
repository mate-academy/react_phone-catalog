import { Product } from '../types/ProductCard';

const BASE_URL =
  location.hostname === 'localhost'
    ? ''
    : 'https://olafchuszno.github.io/react_phone-catalog';

export const getAllProducts: () => Promise<Product[]> = () => {
  return fetch(`${BASE_URL}/api/products.json`).then(response =>
    response.json(),
  );
};

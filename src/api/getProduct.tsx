import { BASE_URL } from './getProducts';

export const getProduct = (productId: string) => (
  fetch(`${BASE_URL}/${productId}.json`)
    .then(product => product.json())
);

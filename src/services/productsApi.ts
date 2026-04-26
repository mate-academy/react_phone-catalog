import { ProductPreview } from '../types';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const getProducts = async (): Promise<ProductPreview[]> => {
  return wait(500)
    .then(() => fetch('/api/products.json'))
    .then(response => response.json());
};

import { ProductDetails } from '../types';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const getPhones = async (): Promise<ProductDetails[]> => {
  return wait(500)
    .then(() => fetch('../../public/api/phones.json'))
    .then(response => response.json());
};

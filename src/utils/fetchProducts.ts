import { ProductInfo } from '../types/ProductInfo';

// export const BASE_URL = '/api';
export const BASE_URL = 'https://oshapkun.github.io/react_phone-catalog/api';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getProducts = async (url: string): Promise<ProductInfo[]> => {
  return wait(300)
    .then(() => fetch(BASE_URL + url))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};

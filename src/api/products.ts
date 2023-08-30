import { Product } from '../types/Product';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

// function wait(delay: number) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   });
// }

const request = <T>(url: string): Promise<T> => {
  // return wait(900)
  //   .then(() => fetch(BASE_URL + url))
  return fetch(BASE_URL + url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    });
};

export const getProducts = (): Promise<Product[]> => request('/products.json');
export const getProductDetails = (
  productId: string,
): Promise<Product> => {
  return request(`/products/${productId}.json`);
};

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        Promise.reject(new Error('error'));
      }

      return response.json();
    });
};

export const getAllProducts = () => request('/products.json');
export const getProduct = (productId: string) => request(`/products/${productId}.json`);

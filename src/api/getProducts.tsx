const BASE_URL
= 'https://mate-academy.github.io/react_phone-catalog/api';

function request(url: string) {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(`${response.status} - ${response.statusText}`));
      }

      return response.json();
    });
}

export const getProducts = (): Promise<Product[]> => request('/products.json');

export const getProductDetails = (id: string) => request(`/products/${id}.json`);

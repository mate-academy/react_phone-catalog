const API_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

const request = (url) => {
  return fetch(`${API_URL}${url}.json`)
    .then(response => response.json());
};

export const getProducts = () => request('/products');
export const getProduct = productId => request(`/products/${productId}`);

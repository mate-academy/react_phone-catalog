const API_PRODUCTS_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products';


export const getProducts = () => {
  return fetch(`${API_PRODUCTS_URL}.json`)
    .then(response => response.json());
};

export const getDetails = (productId: string) => {
  return fetch(`${API_PRODUCTS_URL}/${productId}.json`)
    .then(response => response.json());
};

const API_PHONES_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products';


export const getProducts = () => {
  return fetch(`${API_PHONES_URL}.json`)
    .then(response => response.json());
};

export const getProductDetails = () => {
  return fetch(`${API_PHONES_URL}/{productId}.json`)
    .then(response => response.json());
};

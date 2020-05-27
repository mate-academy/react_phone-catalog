const API_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export const getProducts = async () => {
  const res = await fetch(API_URL);

  return res.json();
};

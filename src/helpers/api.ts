const API_URL_PRODUCTS = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export const getProducts = async () => {
  const responseProductsAPI = await fetch(API_URL_PRODUCTS);
  const productsFromServer = await responseProductsAPI.json();

  return productsFromServer;
};

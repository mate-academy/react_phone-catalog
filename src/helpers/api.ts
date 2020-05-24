const PRODUCT_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export const getProductsFromServer = async (): Promise<Product[]> => {
  return fetch(PRODUCT_URL)
    .then(data => data.json());
};

const PRODUCT_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';
const PRODUCT_INFO = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const getProductsFromServer = async (): Promise<Product[]> => {
  return fetch(PRODUCT_URL)
    .then(data => data.json());
};

export const getProductInfo = async (componentId: string): Promise<ProductInfo> => {
  return fetch(`${PRODUCT_INFO}/${componentId}.json`)
    .then(data => data.json());
};

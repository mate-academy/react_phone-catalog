import { Product } from '../types/Product';

export const URL_NEW
 = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';
export const detailsURL
 = 'https://mate-academy.github.io/react_phone-catalog/_new/products/';

export const getProducts = (url: string) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error();
      }

      return response.json();
    });
};

export const getAllProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  return products;
};

export const getHotProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  return products.sort(
    (a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price),
  );
};

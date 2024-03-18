import { Product } from '../Types/Product';

const BASE_URL =
  'https://mate-academy.github.io/react_phone-catalog/_new/products';

export const getAllProducts = () => {
  return fetch(BASE_URL).then(response => response.json());
};

export const getProducts = (category: string) => {
  return fetch(`${BASE_URL}.json`)
    .then(response => response.json())
    .then(data => {
      return data.filter((product: Product) => product.category === category);
    });
};

export const getProductDetails = (id: string) => {
  return fetch(`${BASE_URL}/${id}.json`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const getSuggestedProducts = () => {
  return fetch(`${BASE_URL}.json`)
    .then(response => response.json())
    .then(data => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return data.sort((_a: Product, _b: Product) => 0.5 - Math.random());
    });
};

export const getHotPriceProducts = () => {
  return fetch(`${BASE_URL}.json`)
    .then(response => response.json())
    .then((data: Product[]) => {
      return data.sort((good1: Product, good2: Product) => {
        return good2.fullPrice - good2.price - (good1.fullPrice - good1.price);
      });
    });
};

export const getNewProducts = () => {
  return fetch(`${BASE_URL}.json`)
    .then(response => response.json())
    .then((data: Product[]) => {
      return data.filter((product: Product) => product.year === 2019);
    })
    .then((data: Product[]) => {
      return data.sort((a: Product, b: Product) => b.fullPrice - a.fullPrice);
    });
};

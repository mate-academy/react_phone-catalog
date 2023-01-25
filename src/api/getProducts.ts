import { Product } from '../types/Product';

const URL = `https://mate-academy.github.io/
react_phone-catalog/api/products.json`;

export const getProducts = async () => {
  const result = await fetch(URL);
  const data = await result.json();

  return data.map((product: Product) => {
    return {
      ...product,
    };
  });
};

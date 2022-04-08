// Types
import { Product } from '../types/Product';

export const getProducts = () => {
  return fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
    .then(response => response.json())
    .then(products => products.map((product: Product) => {
      return {
        ...product,
        discountSum: (product.price / 100) * product.discount,
        newPrice: product.price - ((product.price / 100) * product.discount),
      };
    }));
};

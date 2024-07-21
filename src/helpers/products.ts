import { Product } from '../types/ProductType';

// eslint-disable-next-line
const BASE_API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

export function getAll(): Promise<Product[]> {
  return fetch(BASE_API_URL)
    .then(response => response.json());
}

export const getHotPriceProducts = () => {
  return getAll()
    .then(products => products.sort((a, b) => {
      const absolutDiscountA = (a.price * 100) / a.fullPrice;
      const absolutDiscountB = (b.price * 100) / b.fullPrice;

      return absolutDiscountA - absolutDiscountB;
    }));
};

export const getSuggestedProducts = () => {
  return getAll()
    .then(data => data.sort(() => 0.5 - Math.random()));
};

export const getProduct = (productId: string) => {
  return fetch(`${BASE_API_URL.slice(0, -5)}/${productId.slice(2)}.json`)
    .then(response => response.json());
};

export const getBrandNewProducts = () => {
  return getAll()
    .then(products => {
      return products
        // .filter(product => product.discount === 0)
        .sort((a, b) => b.price - a.price);
    });
};

export const getPhones = () => {
  return getAll()
    .then(products => {
      return products
        .filter(product => product.category === 'phones');
    });
};

export const getTablets = () => {
  return getAll()
    .then(products => {
      return products
        .filter(product => product.category === 'tablets');
    });
};

export const getAccessories = () => {
  return getAll()
    .then(products => {
      return products
        .filter(product => product.category === 'accessories');
    });
};

export function getNumbers(from: number, to: number): number[] {
  const numbers: number[] = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

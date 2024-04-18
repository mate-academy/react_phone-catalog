import {
  Product,
  TypeItemOnPage,
  TypeProduct,
  TypeSort,
} from '../types/product';
import { getAccessories } from './accessories';
import { getPhones } from './phones';
import { getTablets } from './tablets';
import { client } from '../utils/axiosClient';

export const getProductCards = () => {
  return client.get<Product[]>('/products.json');
};

export const getNewProducts = () => {
  return getProductCards().then(res => {
    return res.sort((p1, p2) => p2.price - p1.price);
  });
};

export const getDiscountProducts = () => {
  return getProductCards().then(res => {
    return res.sort(
      (p1, p2) => p2.fullPrice - p2.price - (p1.fullPrice - p1.price),
    );
  });
};

export const getPreparedProducts = (
  type: TypeProduct,
  typeSort: TypeSort,
  currentPage: number,
  perPage: TypeItemOnPage,
) => {
  return getProductCards().then(res => {
    const allProducts = res
      .filter(product => product.category === type)
      .sort((p1, p2) => {
        switch (typeSort) {
          case 'Newest':
            return p2.year - p1.year;

          case 'Alphabetically':
            return p1.name.localeCompare(p2.name);

          case 'Cheapest':
            return p2.price - p1.price;
        }
      });

    if (perPage === 'All') {
      return allProducts;
    }

    return allProducts.slice(
      (currentPage - 1) * +perPage,
      currentPage * +perPage,
    );
  });
};

export const getAmountOfProducts = async () => {
  const [accessories, phones, tablets] = await Promise.all([
    getAccessories(),
    getPhones(),
    getTablets(),
  ]);

  return {
    phones: phones.length,
    tablets: tablets.length,
    accessories: accessories.length,
  };
};

export const getProductInfo = (id: string) => {
  return Promise.any([
    getAccessories().then(
      res => res.find(product => product.id === id) || Promise.reject(null),
    ),
    getPhones().then(
      res => res.find(product => product.id === id) || Promise.reject(null),
    ),
    getTablets().then(
      res => res.find(product => product.id === id) || Promise.reject(null),
    ),
  ]);
};

export const getRandomProducts = (amount: number) =>
  getProductCards().then(res =>
    Array.from(
      { length: amount },
      () => res[Math.floor(Math.random() * res.length)],
    ),
  );

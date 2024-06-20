import cn from 'classnames';

import styles from '../components/HeaderLinks/HeaderLinks.module.scss';

import { Product } from '../types/Product';
import { SortOrders, SortOrdersType } from '../types/SortOrders';
import { Sorts, SortsType } from '../types/Sorts';

import { Cart } from '../types/Cart';
import { suffle } from './helpers';

export const request = <T>(url: string): Promise<T> => {
  return fetch(url).then(responce => {
    return responce.json() as Promise<T>;
  });
};

export const getActiveNavLink = ({ isActive }: { isActive: boolean }) => {
  return cn(styles.Link, { [styles.Active]: isActive });
};

export const getSortedProducts = (
  products: Product[],
  sortBy: SortsType,
  order: SortOrdersType = SortOrders.asc,
) => {
  const currentOrder = order === SortOrders.asc ? 1 : -1;

  switch (sortBy) {
    case Sorts.age:
      return [...products].sort((a, b) => b.year - a.year);
    case Sorts.title:
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case Sorts.price:
      return [...products].sort((a, b) => (a.price - b.price) * currentOrder);
    case Sorts.year:
      return [...products].sort((a, b) => (a.year - b.year) * currentOrder);
    default:
      return products;
  }
};

export const getLocalStorage = () => {
  const saved = localStorage.getItem('cart');
  const initialStore = JSON.parse(String(saved));

  return initialStore || [];
};

export const getTotalPriceOfCart = (cart: Cart[]) => {
  let total = 0;

  for (const item of cart) {
    const result = item.quantity * item.product.price;

    total += result;
  }

  return total;
};

export const getSuggestedProducts = (products: Product[]) => {
  return suffle(products);
};

export const normalizeString = (str: string) => {
  return `${parseInt(str)} ${str.slice(-2)}`;
};

export const capatalize = (string: string) => {
  return string[0].toUpperCase() + string.slice(1);
};

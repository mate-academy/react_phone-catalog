import cn from 'classnames';

import styles from '../components/HeaderLinks/HeaderLinks.module.scss';

import { Product } from '../types/Product';
import { suffle } from './helpers';

export const getActiveNavLink = ({ isActive }: { isActive: boolean }) => {
  return cn(styles.Link, { [styles.Active]: isActive });
};

export const getLocalStorage = (key: string) => {
  const saved = localStorage.getItem(key);
  const initialStore = JSON.parse(String(saved));

  return initialStore || [];
};

export const getSuggestedProducts = (products: Product[]): Product[] => {
  return suffle(products);
};

export const extractNumberAndSuffix = (str: string): string => {
  return `${parseInt(str)} ${str.slice(-2)}`;
};

export const capatalize = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1);
};

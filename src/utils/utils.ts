import classNames from 'classnames';
import { Product } from '../types/Product';

export const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('nav__link', {
    active: isActive,
  });

export const scrollToTop = () => window.scrollTo(0, 0);

export const getLatestProducts = (products: Product[]) => {
  if (products.length === 0) {
    return [];
  }

  const maxYear = products.reduce(
    (max, product) => (product.year > max ? product.year : max),
    products[0].year,
  );

  return products.filter(product => product.year === maxYear).slice(0, 20);
};

export const getHotProducts = (products: Product[]) => {
  const res = [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );

  return res.slice(0, 20);
};

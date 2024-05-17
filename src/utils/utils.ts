import classNames from 'classnames';
import { Product } from '../types/Product';

export const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('nav__link', {
    active: isActive,
  });

export const scrollToTop = () => window.scrollTo(0, 0);
// export const scrollOnTop = (point = 0) =>
//   window.scrollTo({ top: point, behavior: 'smooth' });

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

export const adaptivePaginationPages = (
  pages: number[],
  activePage: number,
) => {
  if (pages.length <= 7) {
    return pages;
  }

  const emptyElement = ['...'];
  const activePageIndex = pages.indexOf(activePage);
  const fifthFromEndIndex = pages.length - 1 - 4;

  if (activePageIndex < 4) {
    const firstPart = pages.slice(0, 5);

    return [...firstPart, ...emptyElement, pages[pages.length - 1]];
  }

  if (activePageIndex >= 4 && activePageIndex <= fifthFromEndIndex) {
    const middlePart = pages.slice(activePageIndex - 1, activePageIndex + 2);

    return [
      pages[0],
      ...emptyElement,
      ...middlePart,
      ...emptyElement,
      pages[pages.length - 1],
    ];
  }

  if (activePageIndex > fifthFromEndIndex) {
    const lastPart = pages.slice(fifthFromEndIndex);

    return [pages[0], ...emptyElement, ...lastPart];
  }

  return [];
};

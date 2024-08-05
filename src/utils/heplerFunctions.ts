import classNames from 'classnames';
import { Gadget } from '../types/Gadget';
import { Sort } from '../types/Sort';

export const sortProducts = (
  products: Gadget[],
  sortCriteria: Sort,
): Gadget[] => {
  switch (sortCriteria) {
    case Sort.BY_YEAR:
      return [...products].sort((a, b) => b.year - a.year);
    case Sort.BY_NAME:
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case Sort.BY_PRICE:
      return [...products].sort((a, b) => a.price - b.price);
    default:
      return products;
  }
};

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const normalizeColor = (color: string): string => {
  return color.replace(/\s+/g, '-').toLowerCase();
};

export const getIconClass = ({ isActive }: { isActive: boolean }) =>
  classNames('header__user--icon', {
    'is-active-icon': isActive,
  });

export const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('header__navbar--link', {
    'is-active': isActive,
  });

export const getIconMenuClass = ({ isActive }: { isActive: boolean }) =>
  classNames('menu__shop--icon', {
    'is-active-icon': isActive,
  });

export const getLinkMenuClass = ({ isActive }: { isActive: boolean }) =>
  classNames('menu-nav-link', {
    'is-active': isActive,
  });

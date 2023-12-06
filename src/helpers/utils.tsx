import classNames from 'classnames';
import { Product } from './Product';

export const filterPr = (
  products: Product[],
  filterBy: string,
) => {
  let newArr = [];

  switch (filterBy) {
    case 'year':
      newArr = products.sort((a, b) => b.year - a.year);
      break;

    case 'price':
      newArr = products.sort((a, b) => a.price - b.price);
      break;

    case 'random':
      newArr = products.sort(() => Math.random() - 0.5);
      break;

    case 'alphabetically':
      newArr = products.sort((a, b) => a.name.localeCompare(b.name));
      break;

    default:
      newArr = products;
  }

  return newArr;
};

export const getLengthByCategory = (products: Product[], category: string) => {
  return products.filter(product => product.category === category).length;
};

export const getCategory = (products: Product[], category: string) => {
  return products.filter(product => product.category === category);
};

export const isActiveTab = ({ isActive }: { isActive: boolean }) => classNames(
  'nav__link', { nav__active: isActive },
);

export const isActiveLike = ({ isActive }: { isActive: boolean }) => classNames(
  'header__like', 'header__chose', { nav__active: isActive },
);

export const isActiveAdd = ({ isActive }: { isActive: boolean }) => classNames(
  'header__add', 'header__chose', { nav__active: isActive },
);

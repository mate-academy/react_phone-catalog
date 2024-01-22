import { categoriesPath } from './constants';

export const getName = (i: number) => {
  return categoriesPath[i][0].toUpperCase() + categoriesPath[i].slice(1);
};

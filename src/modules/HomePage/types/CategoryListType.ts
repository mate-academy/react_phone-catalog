import type { ProductPage } from '../../../shared/types/ProductPage';

export type CategoryListType = {
  items?: ProductPage[];
  filtredCategory: object;
  isFullPrice?: boolean;
};

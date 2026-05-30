import { Product } from '../../../shared/types/ProductPage';

export type TotalPagesCount = {
  items: Product[];
  cardsPerPage: number | string;
};

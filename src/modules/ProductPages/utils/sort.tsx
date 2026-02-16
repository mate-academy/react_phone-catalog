import { ProductPage } from '../../../shared/types/ProductPage';

type SortItem = {
  items: ProductPage[];
  sortField: string;
};
export const sortItems = ({ items, sortField }: SortItem) => {
  items.sort((a, b) => {
    if (sortField === 'title') {
      return a.name.localeCompare(b.name);
    }

    if (sortField === 'price') {
      return a.price - b.price;
    }

    return b.year - a.year;
  });
};

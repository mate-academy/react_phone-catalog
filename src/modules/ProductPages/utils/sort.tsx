import { Product } from '../../../shared/types/ProductPage';

type sortItem = {
  items: Product[];
  sortField: string;
};
export const sortItems = ({ items, sortField }: sortItem) => {
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

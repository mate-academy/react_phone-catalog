import { Product } from '../types/Product';

type Props = {
  products: Product[];
  sortBy: string;
  perPage: string;
  category: string;
  page: number;
};

export const getVisibleProducts = ({
  products,
  sortBy,
  perPage,
  category,
  page,
}: Props) => {
  const onCategory = products.filter(product => product.category === category);

  const sorted = (() => {
    switch (sortBy) {
      case 'newest':
        return [...onCategory].sort((a, b) => b.year - a.year);
      case 'alphabetically':
        return [...onCategory].sort((a, b) => a.name.localeCompare(b.name));
      case 'price-asc':
        return [...onCategory].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...onCategory].sort((a, b) => b.price - a.price);
      default:
        return onCategory;
    }
  })();

  if (perPage === 'all') {
    return sorted;
  }

  return sorted.slice((page - 1) * Number(perPage), page * Number(perPage));
};

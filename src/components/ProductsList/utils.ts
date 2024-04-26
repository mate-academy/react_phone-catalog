import { Product } from '../../types/Product';

export const sortProducts = (allProducts: Product[], sortType: string) => {
  const sorted = [...allProducts];

  switch (sortType) {
    case 'newest':
      return sorted.sort((a, b) => b.year - a.year);
    case 'alphabetically':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'cheapest':
      return sorted.sort((a, b) => a.price - b.price);
    default:
      return sorted;
  }
};

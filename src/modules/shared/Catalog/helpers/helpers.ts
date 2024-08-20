import { Category } from '../../../../types/Categories';
import { Product } from '../../../../types/Product';

export const sortProducts = (
  products: Product[],
  sortByParam: string | null,
): Product[] => {
  const sortedProducts = [...products];

  switch (sortByParam) {
    case 'title':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return sortedProducts.sort((a, b) => a.price - b.price);
    default:
      return sortedProducts.sort((a, b) => b.year - a.year);
  }
};

export const getTitle = (category: Category): string => {
  switch (category) {
    case Category.Phones:
      return 'Mobile phones';
    case Category.Tablets:
      return 'Tablets';
    case Category.Accessories:
      return 'Accessories';
    default:
      return '';
  }
};

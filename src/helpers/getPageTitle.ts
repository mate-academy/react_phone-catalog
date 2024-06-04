import { ProductCategories } from '../types/ProductCategories';

export const getPageTitle = (category: ProductCategories) => {
  switch (category) {
    case ProductCategories.Phones:
      return 'Mobile Phones';
    case ProductCategories.Tablets:
      return 'Tablets';
    case ProductCategories.Accessories:
      return 'Accessories';
    default:
      return 'Invalid path';
  }
};

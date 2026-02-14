import { ProductCategory } from '../types/ProductGeneral';

export const getProductsPageTitle = (
  category: ProductCategory,
  countProducts: number,
): string => {
  if (!countProducts) {
    return `There are no ${category} yet`;
  }

  switch (category) {
    case 'phones':
      return 'Mobile phones';

    case 'tablets':
      return 'Tablets';

    case 'accessories':
      return 'Accessories';
  }
};

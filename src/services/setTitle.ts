import { ProductCagetories } from '../types/ProductCategories';

export const setTitle = (sortBy: ProductCagetories) => {
  switch (sortBy) {
    case ProductCagetories.phones:
      return 'Mobile phones';

    case ProductCagetories.tablets:
      return 'Tablets';

    case ProductCagetories.accessories:
      return 'Accessories';

    default:
      return '';
  }
};

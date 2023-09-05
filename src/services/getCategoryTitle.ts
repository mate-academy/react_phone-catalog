import { CategoriesNames } from '../types/CategoriesNames';

export const getCategoryTitle = (categoryName: string) => {
  switch (categoryName) {
    case CategoriesNames.Phones:
      return 'Mobile phones';

    case CategoriesNames.Accessories:
      return 'Accessories';

    case CategoriesNames.Tablets:
      return 'Tablets';

    default:
      return 'Category doesn\'t exist';
  }
};

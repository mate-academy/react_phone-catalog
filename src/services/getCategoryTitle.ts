import { CategoriesNames } from '../types/CategoriesNames';

export const getCategoryTitle = (categoryName: string) => {
  switch (categoryName) {
    case CategoriesNames.Phones:
      return 'mobile phones';

    case CategoriesNames.Accessories:
      return 'accessories';

    case CategoriesNames.Tablets:
      return 'tablets';

    default:
      return 'category doesn\'t exist';
  }
};

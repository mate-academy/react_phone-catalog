import { CategoryName } from '../enums/categoryName';

export const getCategoryTitle = (categoryName: string) => {
  switch (categoryName) {
    case CategoryName.PHONES:
      return 'Mobile phones';
    case CategoryName.TABLETS:
      return 'Tablets';
    case CategoryName.ACCESSORIES:
      return 'Accessories';
    default:
      return 'Products';
  }
};

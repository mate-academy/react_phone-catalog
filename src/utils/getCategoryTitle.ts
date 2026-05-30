import { CategoryName } from '@enums/CategoryName';

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

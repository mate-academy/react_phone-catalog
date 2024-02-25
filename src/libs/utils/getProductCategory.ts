import { CategoryName } from '../types/categoryName.enum';
import { ProductType } from '../types';

export const getProductCategory = (
  categoryName: string,
): ProductType => {
  switch (categoryName) {
    case CategoryName.Accessories:
      return 'accessory';

    case CategoryName.Tablets:
      return 'tablet';

    default:
      return 'phone';
  }
};

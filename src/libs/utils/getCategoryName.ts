import { CategoryName } from '../types/categoryName.enum';
import { ProductType } from '../types';

export const getCategoryName = (
  productCategory: ProductType,
): CategoryName => {
  switch (productCategory) {
    case 'tablet':
      return CategoryName.Tablets;

    case 'accessory':
      return CategoryName.Accessories;

    default:
      return CategoryName.Phones;
  }
};

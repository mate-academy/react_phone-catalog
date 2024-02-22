import { CategoryName } from '../types/categoryName.enum';
import { Product } from '../types';
import {
  changeCategoryNameIntoPropductCategory,
} from './changeCategoryNameIntoPropductCategory';

export const getCurrentProducts = (products: Product[], category: string) => {
  if (!Object.keys(CategoryName)
    .some(
      el => el.toLowerCase() === category.toLowerCase(),
    )) {
    return [];
  }

  const typeToComparison = changeCategoryNameIntoPropductCategory(category);

  return products.filter(item => item.type === typeToComparison);
};

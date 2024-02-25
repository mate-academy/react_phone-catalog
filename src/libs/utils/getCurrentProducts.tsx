import { CategoryName } from '../types/categoryName.enum';
import { IProduct } from '../types';
import {
  getProductCategory,
} from './getProductCategory';

export const getCurrentProducts = (products: IProduct[], category: string) => {
  if (!Object.keys(CategoryName)
    .some(
      el => el.toLowerCase() === category.toLowerCase(),
    )) {
    return [];
  }

  const typeToComparison = getProductCategory(category);

  return products.filter(item => item.type === typeToComparison);
};

import { ProductCategory } from '../../types/ProductCategory';
import { PRODUCT_CATEGORIES } from '../constants/ProductCategories';

export function isProductCategory(value: string): value is ProductCategory {
  return (PRODUCT_CATEGORIES as unknown as string[]).includes(value);
}

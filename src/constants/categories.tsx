import {
  categoryBannerMap,
  categoryImageMap,
  categoryDescriptionMap,
} from '../helpers/categoriesHelper';
import { Category } from '../types/Category';

const fallbackCategoryNames = {
  phones: 'phones',
  tablets: 'tablets',
  accessories: 'accessories',
};

export const fallbackCategories: Category[] = [
  {
    name: fallbackCategoryNames.phones,
    banner: categoryBannerMap[fallbackCategoryNames.phones] || '',
    image: categoryImageMap[fallbackCategoryNames.phones] || '',
    modelsCount: 0,
    description:
      categoryDescriptionMap[fallbackCategoryNames.phones] ||
      'Explore our phones',
  },
  {
    name: fallbackCategoryNames.tablets,
    banner: categoryBannerMap[fallbackCategoryNames.tablets] || '',
    image: categoryImageMap[fallbackCategoryNames.tablets] || '',
    modelsCount: 0,
    description:
      categoryDescriptionMap[fallbackCategoryNames.tablets] ||
      'Explore our tablets',
  },
  {
    name: fallbackCategoryNames.accessories,
    banner: categoryBannerMap[fallbackCategoryNames.accessories] || '',
    image: categoryImageMap[fallbackCategoryNames.accessories] || '',
    modelsCount: 0,
    description:
      categoryDescriptionMap[fallbackCategoryNames.accessories] ||
      'Explore our accessories',
  },
];

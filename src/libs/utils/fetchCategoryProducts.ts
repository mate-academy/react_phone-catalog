import { ProductCategory } from '../types';
import * as phonesActions from '../slices/phonesSlice';
import * as tabletsActions from '../slices/tabletsSlice';
import * as accessoriesActions from '../slices/accessoriesSlice';

export const fetchCategoryProducts = (categoryName: string) => {
  switch (categoryName) {
    case ProductCategory.Tablets:
      return tabletsActions.fetchTablets();

    case ProductCategory.Accessories:
      return accessoriesActions.fetchAccessories();

    case ProductCategory.Phones:
    default:
      return phonesActions.fetchPhones();
  }
};

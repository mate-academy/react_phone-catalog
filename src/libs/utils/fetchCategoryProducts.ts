import { CategoryName } from '../types';
import * as phonesActions from '../slices/phonesSlice';
import * as tabletsActions from '../slices/tabletsSlice';
import * as accessoriesActions from '../slices/accessoriesSlice';

export const fetchCategoryProducts = (categoryName: string) => {
  switch (categoryName) {
    case CategoryName.Tablets:
      return tabletsActions.fetchTablets();

    case CategoryName.Accessories:
      return accessoriesActions.fetchAccessories();

    case CategoryName.Phones:
    default:
      return phonesActions.fetchPhones();
  }
};

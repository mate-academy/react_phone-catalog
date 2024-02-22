import { CategoryName } from '../types';
import * as productsActions from '../slices/productsSlice';

export const fetchCurrentProducts = (categoryName: string) => {
  switch (categoryName) {
    case CategoryName.Tablets:
      return productsActions.fetchTablets();

    case CategoryName.Accessories:
      return productsActions.fetchAccessories();

    default:
      return productsActions.fetchPhones();
  }
};

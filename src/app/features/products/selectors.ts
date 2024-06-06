import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import { Category, Product } from '../../../types';

export const selectProducts = (state: AppState) => state.products.products;
export const selectProductsInfo = (state: AppState) => state.products;
export const selectNewProducts = createSelector([selectProducts], products =>
  [...products]
    .sort((a, b) => {
      const yearDifference = b.year - a.year;

      if (!yearDifference) {
        return b.price - a.price;
      }

      return yearDifference;
    })
    .slice(0, 15),
);
export const selectHotPrices = createSelector([selectProducts], products =>
  [...products]
    .sort((a, b) => {
      const discount = b.fullPrice - b.price - (a.fullPrice - a.price);

      if (!discount) {
        return b.year - a.year;
      }

      return discount;
    })
    .slice(0, 15),
);

export const selectPhones = createSelector([selectProducts], products =>
  products.filter(product => product.category === 'phones'),
);

export const selectAccessories = createSelector([selectProducts], products =>
  products.filter(product => product.category === 'accessories'),
);
export const selectTablets = createSelector([selectProducts], products =>
  products.filter(product => product.category === 'tablets'),
);

export const SELECT_CATEGORY: Record<Category, (state: AppState) => Product[]> =
  {
    accessories: selectAccessories,
    phones: selectPhones,
    tablets: selectTablets,
  };

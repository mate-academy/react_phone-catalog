import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import { shuffle } from '../../../utils/shuffle';

export const selectProducts = (state: AppState) => state.products;
export const selectNewProducts = createSelector(
  [selectProducts],
  productsInfo => ({
    ...productsInfo,
    products: [...productsInfo.products].sort((a, b) => {
      const yearDifference = b.year - a.year;

      if (!yearDifference) {
        return b.price - a.price;
      }

      return yearDifference;
    }),
  }),
);
export const selectHotPrices = createSelector(
  [selectProducts],
  productsInfo => ({
    ...productsInfo,
    products: [...productsInfo.products].sort((a, b) => {
      const discount = b.fullPrice - b.price - (a.fullPrice - a.price);

      if (!discount) {
        return b.year - a.year;
      }

      return discount;
    }),
  }),
);

export const selectPhones = createSelector([selectProducts], productsInfo => ({
  ...productsInfo,
  products: productsInfo.products.filter(
    product => product.category === 'phones',
  ),
}));

export const selectAccessories = createSelector(
  [selectProducts],
  productsInfo => ({
    ...productsInfo,
    products: productsInfo.products.filter(
      product => product.category === 'accessories',
    ),
  }),
);
export const selectTablets = createSelector([selectProducts], productsInfo => ({
  ...productsInfo,
  products: productsInfo.products.filter(
    product => product.category === 'tablets',
  ),
}));

export const selectShuffledProducts = createSelector(
  [selectProducts],
  productsInfo => ({
    ...productsInfo,
    products: shuffle(productsInfo.products),
  }),
);

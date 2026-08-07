import { createSelector } from '@reduxjs/toolkit';
import { Category } from '@shared/constants/categoryConfig';
import {
  getDiscountedProducts,
  getNewestProducts,
} from '@shared/utils/sortProducts';
import { RootState } from '@src/app/store';

export const selectProducts = (state: RootState) => state.products.items;

export const selectNewestProducts = createSelector([selectProducts], products =>
  getNewestProducts(products),
);

export const selectDiscountedProducts = createSelector(
  [selectProducts],
  products => getDiscountedProducts(products),
);

export const selectProductsByCategory = createSelector(
  [selectProducts, (_state: RootState, category: Category) => category],
  (products, category) =>
    products.filter(product => product.category === category),
);

export const selectSuggestedProducts = createSelector(
  [selectProducts, (_state: RootState, category: Category) => category],
  (products, category) => {
    const filtered = products.filter(product => product.category === category);

    return [...filtered].sort(() => Math.random() - 0.5).slice(0, 10);
  },
);

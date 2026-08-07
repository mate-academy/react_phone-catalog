import { createSelector } from '@reduxjs/toolkit';
import { Category } from '@shared/constants/categoryConfig';
import { RootState } from '@src/app/store';

export const selectProductDetails = (state: RootState) =>
  state.productDetails.items;

export const selectProductById = createSelector(
  [
    selectProductDetails,
    (_state: RootState, category: Category) => category,
    (_state: RootState, _category: Category, productId: string) => productId,
  ],
  (items, category, productId) =>
    items[category]?.find(product => product.id === productId) ?? null,
);

export const selectVariants = createSelector(
  [
    selectProductDetails,
    (_state: RootState, category: Category) => category,
    (_state: RootState, _category: Category, namespaceId: string) =>
      namespaceId,
  ],
  (items, category, namespaceId) =>
    items[category]?.filter(p => p.namespaceId === namespaceId) ?? [],
);

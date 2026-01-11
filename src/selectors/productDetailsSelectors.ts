import { productDetailsApi } from '../services/productDetailsApi';
import type { RootState } from '../store';
import { Category } from '../types';
import { createSelector } from '@reduxjs/toolkit';

const selectProductDetailsResult = (state: RootState, category: Category) =>
  productDetailsApi.endpoints.getProductsByCategory.select(category)(state);

export const selectProductDetailsById = createSelector(
  [
    (state: RootState, category: Category) =>
      selectProductDetailsResult(state, category),
    (_state: RootState, _category: Category, id: string) => id,
  ],
  (result, id) => {
    return result.data?.find(detail => detail.id === id) ?? null;
  },
);

export const selectProductDetailsByNamespaceId = createSelector(
  [
    (state: RootState, category: Category) =>
      selectProductDetailsResult(state, category),
    (_state: RootState, _category: Category, namespaceId: string) =>
      namespaceId,
  ],
  (result, namespaceId) => {
    return (
      result.data?.find(detail => detail.namespaceId === namespaceId) ?? null
    );
  },
);

import { createSelector } from '@reduxjs/toolkit';
import { productDetailsApi } from '../services/productDetailsApi';
import type { RootState } from '../../../store';
import { Category } from '../../../types';

const selectProductDetailsResult = (state: RootState, category: Category) =>
  productDetailsApi.endpoints.getProductsByCategory.select(category)(state);

export const selectProductDetailsById = createSelector(
  [
    (state: RootState, category: Category) =>
      selectProductDetailsResult(state, category).data,
    (_state: RootState, _category: Category, id: string) => id,
  ],
  (data, id) => {
    return data?.find(detail => detail.id === id) ?? null;
  },
);

export const selectProductDetailsByNamespaceId = createSelector(
  [
    (state: RootState, category: Category) =>
      selectProductDetailsResult(state, category).data,
    (_state: RootState, _category: Category, namespaceId: string) =>
      namespaceId,
  ],
  (data, namespaceId) => {
    return data?.find(detail => detail.namespaceId === namespaceId) ?? null;
  },
);

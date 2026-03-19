import { favouritesAdapter } from '../features/favouritesSlice';
import type { RootState } from '../../../store';
import { createSelector } from '@reduxjs/toolkit';

const selectors = favouritesAdapter.getSelectors(
  (state: RootState) => state.favourites,
);

export const favouritesSelectors = {
  selectAll: selectors.selectAll,
  selectById: selectors.selectById,
  selectTotal: selectors.selectTotal,
  selectIsInFavourites: createSelector(
    selectors.selectById,
    product => !!product,
  ),
};

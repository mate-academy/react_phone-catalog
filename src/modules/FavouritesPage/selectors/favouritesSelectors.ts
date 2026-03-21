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
  selectFiltered: createSelector(
    [selectors.selectAll, (_state: RootState, query: string) => query],
    (favourites, query) => {
      const lowerQuery = query.toLowerCase().trim();

      if (!lowerQuery) {
        return favourites;
      }

      return favourites.filter(product =>
        product.name.toLowerCase().includes(lowerQuery),
      );
    },
  ),
};

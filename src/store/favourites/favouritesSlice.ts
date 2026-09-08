/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Product } from '../../types/Product';
import { init } from '../products/productsSlice';

export interface State {
  favourites: string[];
}

function updateLocalStorage(ids: string[]) {
  localStorage.setItem('favourites', JSON.stringify(ids));
}

const initialState: State = {
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavorite: (state, { payload: itemId }: PayloadAction<string>) => {
      const isExist = state.favourites.some(id => id === itemId);

      if (isExist) {
        state.favourites = state.favourites.filter(id => id !== itemId);
      } else {
        state.favourites.push(itemId);
      }

      updateLocalStorage(state.favourites);
    },
  },
  extraReducers: builder => {
    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        const products = action.payload;
        const validProductIds = new Set(
          products.map(product => product.itemId),
        );

        const updatedFavs = state.favourites.filter(itemId =>
          validProductIds.has(itemId),
        );

        state.favourites = updatedFavs;
        updateLocalStorage(updatedFavs);
      },
    );
  },
});

export const selectFavouritesCount = (state: RootState) => {
  return state.favourites.favourites.length;
};

export default favouritesSlice.reducer;
export const { actions: favActions } = favouritesSlice;

let isStorageListenerAdded = false;

const handleStorageChange = (event: StorageEvent) => {
  if (event.key === 'favourites') {
    window.location.reload();
  }
};

if (!isStorageListenerAdded) {
  window.addEventListener('storage', handleStorageChange);
  isStorageListenerAdded = true;
}

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { loadFromLocalStorage } from '../../utils/loadFromLocalStorage';
import { saveToLocalStotage } from '../../utils/saveToLocalStotage';

export const LOCAL_STORAGE_KEY = 'favourites';

type FavouritesState = {
  list: Product[];
  count: number;
};

const initialState: FavouritesState = {
  list: loadFromLocalStorage(LOCAL_STORAGE_KEY),
  count: 0,
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      if (action.payload && action.payload.id) {
        state.list.push(action.payload);
        state.count += 1;
        saveToLocalStotage(state.list, LOCAL_STORAGE_KEY);
      }
    },

    removeFavourite: (state, action) => {
      if (action.payload && action.payload.id) {
        state.list = state.list.filter(
          (product) => product.id !== action.payload.id,
        );
        state.count -= 1;
        saveToLocalStotage(state.list, LOCAL_STORAGE_KEY);
      }
    },

    initializeFavorites: (state, action) => {
      state.list = action.payload;
      state.count = action.payload.length;
    },
  },
});

export const {
  addFavourite,
  removeFavourite,
  initializeFavorites,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;

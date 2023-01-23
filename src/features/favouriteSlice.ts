/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FavoriteState {
  favorites: string[]
}
const favouriteLocalStorageKey = 'favourite';

const getFavouritesFromLocalStorage = (key: string):string[] => {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  }

  return [];
};

const writeFavouritesToLocalStorage = (
  key:string,
  itemId: string | string[],
) => {
  const item = getFavouritesFromLocalStorage(key);

  if (typeof itemId === 'string') {
    item.push(itemId);
  } else {
    itemId.forEach(id => item.push(id));
  }

  localStorage.setItem(key, JSON.stringify(item));
};

const deleteFavouritesFromLocalStorage = (key:string, itemId: string) => {
  const item = getFavouritesFromLocalStorage(key);

  localStorage.setItem(key, JSON.stringify(item.filter(id => id !== itemId)));
};

const initialState: FavoriteState = {
  favorites: getFavouritesFromLocalStorage(favouriteLocalStorageKey),
};

export const favouriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<string>) => {
      writeFavouritesToLocalStorage(favouriteLocalStorageKey, action.payload);
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      deleteFavouritesFromLocalStorage(
        favouriteLocalStorageKey, action.payload,
      );
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
  },
});

export const { addFavourite, removeFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;

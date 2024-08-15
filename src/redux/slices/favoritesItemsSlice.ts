import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StorageItem } from '../../types/StorageItem';
import {
  getLocalStorageItems,
  setLocalStorageItems,
} from '../../localStorage/localStorage';

const name = 'favoritesItems';
const initialState = getLocalStorageItems<StorageItem[]>(name, []);

const favoritesItemsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setFavoritesItems: (_, action: PayloadAction<StorageItem[]>) => {
      setLocalStorageItems<StorageItem[]>(name, action.payload);

      return action.payload;
    },

    clearFavoritesItems: () => {
      setLocalStorageItems<StorageItem[]>(name, []);

      return [];
    },
  },
});

export default favoritesItemsSlice.reducer;
export const { setFavoritesItems } = favoritesItemsSlice.actions;
export const selectFavoritesItems = (state: RootState) => state.favoritesItems;

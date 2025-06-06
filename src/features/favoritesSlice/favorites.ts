import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appLocaleStorage } from '../../utils/localeStorageClient';
import { Products } from '../../types/Products';

const storage = appLocaleStorage('favorites');

const initialState: Products[] = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    loadFavouritesItmes: () => {
      const data = storage.getData();

      if (!data) {
        storage.setData([]);

        return [];
      } else if (!Array.isArray(data)) {
        storage.setData([]);

        return [];
      } else {
        return data;
      }
    },
    setItem: (state, action: PayloadAction<Products>) => {
      const newState = [...state, action.payload];

      storage.setData(newState);

      return newState;
    },
    deleteItem: (state, action: PayloadAction<Products>) => {
      const newState = state.filter(v => v.itemId !== action.payload.itemId);

      storage.setData(newState);

      return newState;
    },
  },
});

export const { loadFavouritesItmes, setItem, deleteItem } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;

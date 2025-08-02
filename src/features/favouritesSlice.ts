import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../helpers/handleLocalStorage';
import { localStorageKey } from '../enums/localStorageKey';

type FavouritesState = {
  favourites: Product[];
  loading: boolean;
  error: boolean;
};

const initialState: FavouritesState = {
  favourites: [],
  loading: false,
  error: false,
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<Product>) => {
      const inFavourites = state.favourites.some(
        fav => fav.itemId === action.payload.itemId,
      );

      if (inFavourites) {
        state.favourites = state.favourites.filter(
          fav => fav.itemId !== action.payload.itemId,
        );
      } else {
        state.favourites.push(action.payload);
      }

      saveToLocalStorage(localStorageKey.favourites, state.favourites);
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.favourites = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default favouritesSlice.reducer;
export const { toggleFavourite } = favouritesSlice.actions;

export const init = createAsyncThunk<Product[]>('favorites/init', async () => {
  return loadFromLocalStorage<Product[]>(localStorageKey.favourites);
});

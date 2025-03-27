/* eslint-disable no-param-reassign */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/products';

export const loadFavouritesAsync = createAsyncThunk(
  'favourites/load',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const storedFavourites = await localStorage.getItem('favourites');

    return storedFavourites ? JSON.parse(storedFavourites) : [];
  },
);

type FavouritesState = {
  favourites: Product[];
  favouritesLength: number;
  loading: boolean;
  error: string | null;
};

const initialState: FavouritesState = {
  favourites: [],
  favouritesLength: 0,
  loading: false,
  error: null,
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<Product>) => {
      if (!state.favourites.some(item => item.id === action.payload.id)) {
        state.favourites.unshift(action.payload);
        state.favouritesLength += 1;
        localStorage.setItem('favourites', JSON.stringify(state.favourites));
      }
    },
    removeFromFavourites: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(
        item => item.itemId !== action.payload,
      );
      state.favouritesLength -= 1;
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadFavouritesAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFavouritesAsync.fulfilled, (state, action) => {
        state.favourites = action.payload;
        state.favouritesLength = action.payload.length;
        state.loading = false;
        state.error = null;
      })
      .addCase(loadFavouritesAsync.rejected, state => {
        state.loading = false;
        state.error = 'Failed to load favourites';
      });
  },
});

export const { addToFavourites, removeFromFavourites } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;

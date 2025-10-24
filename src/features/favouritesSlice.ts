import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

type FavouritesState = {
  favourites: Product[];
  loading: boolean;
  error: string;
};

const initialState: FavouritesState = {
  favourites: [],
  loading: false,
  error: '',
};

const accessoriesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    /* eslint-disable no-param-reassign */
    set: (state, action: PayloadAction<Product[]>) => {
      state.favourites = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    /* eslint-enable no-param-reassign */
  },
});

export const { reducer, actions } = accessoriesSlice;

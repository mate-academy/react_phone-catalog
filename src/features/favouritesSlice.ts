/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Accessory } from '../types';

type FavouritesState = {
  favourites: Accessory[];
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
    set: (state, action: PayloadAction<Accessory[]>) => {
      state.favourites = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { reducer, actions } = accessoriesSlice;

/* eslint-disable no-param-reassign */
import { Dispatch, PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { RootState } from '../app/store';

const initialState: Product[] = [];

const KEY = 'favorites';

const updateLocalStorage = (state: Product[]) => {
  localStorage.setItem(KEY, JSON.stringify(state));
};

const getLocalFavorites = (): Product[] => {
  const favoritesLocal = localStorage.getItem(KEY);

  if (favoritesLocal === null) {
    return [];
  }

  try {
    return JSON.parse(favoritesLocal);
  } catch (error) {
    localStorage.clear();

    return [];
  }
};

export const favoritesSlice: Slice<Product[]> = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, { payload }: PayloadAction<Product>) => {
      state.push(payload);
    },
    removeFavorite: (state, { payload }: PayloadAction<Product>) => {
      return state.filter(favorite => favorite.id !== payload.id);
    },
    toggleFavorite: (state, { payload }: PayloadAction<Product>) => {
      const alreadyFavorite = state.find(
        storedFavorite => storedFavorite.id === payload.id,
      );

      if (alreadyFavorite) {
        return state.filter(favorite => favorite.id !== payload.id);
      }

      return [...state, payload];
    },
    clearFavorite: () => [],
  },
});

export const { addFavorite, removeFavorite, clearFavorite, toggleFavorite } =
  favoritesSlice.actions;

export const addFavoriteWithLocal = (favorite: Product) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(addFavorite(favorite));

    const state = getState();

    updateLocalStorage(state.favorites);
  };
};

export const removeFavoriteWithLocal = (favorite: Product) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(removeFavorite(favorite));

    const state = getState();

    updateLocalStorage(state.favorites);
  };
};

export const toggleFavoriteWithLocal = (favorite: Product) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(toggleFavorite(favorite));
    const state = getState();

    updateLocalStorage(state.favorites);
  };
};

export const initiateFavoritesFromLocal = () => {
  return (dispatch: Dispatch) => {
    const localFavorites = getLocalFavorites();

    localFavorites.forEach(localFavorite =>
      dispatch(addFavorite(localFavorite)),
    );
  };
};

export const readLocalFavorites = () => {};

export default favoritesSlice.reducer;

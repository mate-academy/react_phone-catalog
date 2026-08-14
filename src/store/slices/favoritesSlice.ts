import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoriteItem {
  id: string;
  category: string;
  name: string;
  price: number;
  fullPrice: number;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
}

export interface FavoritesState {
  items: FavoriteItem[];
}

const loadFavoritesFromStorage = (): FavoriteItem[] => {
  try {
    const storedFavorites = localStorage.getItem('favorites-storage');

    if (storedFavorites) {
      const parsed = JSON.parse(storedFavorites);

      return parsed.state?.items || [];
    }

    return [];
  } catch (error) {
    return [];
  }
};

const initialState: FavoritesState = {
  items: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<FavoriteItem>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (!existingItem) {
        state.items.push(action.payload);

        localStorage.setItem(
          'favorites-storage',
          JSON.stringify({ state: { items: state.items } }),
        );
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const items = state.items.filter(item => item.id !== action.payload);

      localStorage.setItem(
        'favorites-storage',
        JSON.stringify({ state: { items } }),
      );

      return { ...state, items };
    },

    clearFavorites: state => {
      const items: FavoriteItem[] = [];

      localStorage.setItem(
        'favorites-storage',
        JSON.stringify({ state: { items } }),
      );

      return { ...state, items };
    },
  },
});

export const { addItem, removeItem, clearFavorites } = favoritesSlice.actions;

export const selectFavoritesItems = (state: { favorites: FavoritesState }) =>
  state.favorites.items;

export const selectTotalFavorites = (state: { favorites: FavoritesState }) =>
  state.favorites.items.length;

export const selectIsInFavorites =
  (id: string) => (state: { favorites: FavoritesState }) =>
    state.favorites.items.some(item => item.id === id);

export default favoritesSlice.reducer;

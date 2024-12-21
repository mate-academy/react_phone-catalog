import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FavouritesState } from './types/favouritesState';
import { ProductInfo } from '../../types/ProductInfo';

const loadFavouritesFromLocalStorage = (): ProductInfo[] => {
  try {
    const storedFavourites = localStorage.getItem('favourites');

    return storedFavourites ? JSON.parse(storedFavourites) : [];
  } catch (error) {
    console.error('Failed to load favourites from localStorage', error);

    return [];
  }
};

const initialState: FavouritesState = {
  favourites: loadFavouritesFromLocalStorage(),
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<ProductInfo>) => {
      const product = action.payload;

      if (state.favourites.some(good => good.id === product.id)) {
        state.favourites = state.favourites.filter(
          good => good.id !== product.id,
        );
      } else {
        state.favourites.push(product);
      }

      // side effect
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },
  },
});

export default favouritesSlice.reducer;
export const { actions } = favouritesSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialStateFavourites } from "../interfaces/Favourites.interface";
import { IProductCard } from "../interfaces/ProductCard.interface";
import { loadFavouritesFromLocalStorage, saveFavouritesToLocalStorage } from "../helpers/FavouritesLocalStorage";

const initialState: IInitialStateFavourites = loadFavouritesFromLocalStorage();

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites(state, action: PayloadAction<IProductCard>) {
      const existingProduct = state.items.find(item => item.id === action.payload.id);

      if (!existingProduct) {
        state.items.push(action.payload);
      }
      
      saveFavouritesToLocalStorage(state.items);
    },

    removeFromFavourites(state, action: PayloadAction<IProductCard>) {
      const existingProduct = state.items.find(item => item.id === action.payload.id);

      if (existingProduct) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }

      saveFavouritesToLocalStorage(state.items);
    },
  }
});

export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;

import { PayloadAction, Reducer, createSlice } from '@reduxjs/toolkit';
import { ProductInfo } from '../types/ProductInfo';
import {
  getLocalStorData,
  setLocalStorageData,
} from '../helpers/localStorageData';

const key = 'likedProducts';

export interface FavouriteState {
  likedProducts: ProductInfo[];
}

export const initialState: FavouriteState = {
  likedProducts: getLocalStorData(key),
};

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addProductToLiked: (state, action: PayloadAction<ProductInfo>) => {
      const { id } = action.payload;
      const existingProductIndex = state.likedProducts.findIndex(
        p => p.id === id,
      );

      if (existingProductIndex !== -1) {
        state.likedProducts.splice(existingProductIndex, 1);
      } else {
        state.likedProducts.push({ ...action.payload });
      }

      setLocalStorageData(key, state.likedProducts);
    },
  },
});

export const { addProductToLiked } = favouriteSlice.actions;

const favouriteReducer: Reducer<FavouriteState> = favouriteSlice.reducer;
export default favouriteReducer;

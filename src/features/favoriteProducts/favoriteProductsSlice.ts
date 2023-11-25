import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

const favoriteProducts
  = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');

interface FavoriteProductsState {
  value: Product[];
}

const initialState: FavoriteProductsState = {
  value: favoriteProducts,
};

const favoriteProductsSlice = createSlice({
  name: 'favoriteProducts',
  initialState,
  reducers: {
    addFavoriteProduct: (state, action: PayloadAction<Product>) => {
      state.value.push(action.payload);
    },
    removeFavoriteProduct: (state, action: PayloadAction<Product>) => {
      const index = state.value.findIndex(product => {
        return product.id === action.payload.id;
      });

      if (index !== -1) {
        state.value.splice(index, 1);
      }
    },
  },
});

export const {
  addFavoriteProduct,
  removeFavoriteProduct,
} = favoriteProductsSlice.actions;
export default favoriteProductsSlice.reducer;

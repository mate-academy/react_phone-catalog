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

const shoppingCartSlice = createSlice({
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
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;

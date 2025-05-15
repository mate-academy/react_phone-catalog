import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteItems: localStorage.getItem('favoriteItems')
    ? JSON.parse(localStorage.getItem('favoriteItems'))
    : [],
  favoriteTotalQuantity: 0,
  
  status: 'idle',
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const itemIndex = state.favoriteItems.findIndex(
        item => item.name === action.payload.name,
      );

      if (itemIndex >= 0) {
        
        return;
      } else {
        const tempProduct = { ...action.payload, favoriteQuantity: 1 };

        state.favoriteItems.push(tempProduct);
        
        localStorage.setItem(
          'favoriteItems',
          JSON.stringify(state.favoriteItems),
        );
      }
    },

    removeFromFavorites: (state, action) => {
      state.favoriteItems = state.favoriteItems.filter(
        item => item.name !== action.payload.name,
      );
      
      localStorage.setItem(
        'favoriteItems',
        JSON.stringify(state.favoriteItems),
      );
    },

    getFavoritesQuantity: (state, action) => {
      const { quantity } = state.favoriteItems.reduce(
        (favoriteTotal, favoriteItem) => {
          const { favoriteQuantity } = favoriteItem;
          // const itemTotal = price * cartQuantity;

          // cartTotal.total += itemTotal;
          favoriteTotal.quantity += favoriteQuantity;

          return favoriteTotal;
        },
        {
          quantity: 0,
        },
      );

      state.favoriteTotalQuantity = quantity;
      // state.cartTotalAmount = total;
    },
  },
});

export const { addToFavorites, removeFromFavorites, getFavoritesQuantity } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;

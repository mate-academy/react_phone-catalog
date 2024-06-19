/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice, Slice } from '@reduxjs/toolkit';
import { ProductType } from '../../types/ProductType';

export interface ActionState {
  cart: ProductType[];
  favorites: ProductType[];
}

const loadStateFromLocalStorage = (): ActionState => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  return { cart, favorites };
};

const saveStateToLocalStorage = (state: ActionState) => {
  localStorage.setItem('cart', JSON.stringify(state.cart));
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
};

const initialState: ActionState = loadStateFromLocalStorage();

const userSlice: Slice<ActionState> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addInCart: (state, action: PayloadAction<ProductType>) => {
      if (Array.isArray(state.cart)) {
        state.cart.push(action.payload);
      } else {
        state.cart = [action.payload];
      }

      saveStateToLocalStorage(state);
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.itemId !== action.payload);

      saveStateToLocalStorage(state);
    },
    deleteAllCart: state => {
      state.cart = [];

      saveStateToLocalStorage(state);
    },
    plusQuantity: (state, action: PayloadAction<ProductType>) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id);

      if (index !== -1) {
        state.cart[index].quantity += 1;
      }

      saveStateToLocalStorage(state);
    },
    minusQuantity: (state, action: PayloadAction<ProductType>) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id);

      if (index !== -1 && state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
      }

      saveStateToLocalStorage(state);
    },
    addInFavorites: (state, action: PayloadAction<ProductType>) => {
      if (Array.isArray(state.favorites)) {
        state.favorites.push(action.payload);
      } else {
        state.favorites = [action.payload];
      }

      saveStateToLocalStorage(state);
    },
    deleteFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        item => item.itemId !== action.payload,
      );

      saveStateToLocalStorage(state);
    },
    init: state => {
      const loadedState = loadStateFromLocalStorage();

      state.cart = loadedState.cart;
      state.favorites = loadedState.favorites;
    },
  },
});

export const {
  addInCart,
  deleteFromCart,
  plusQuantity,
  minusQuantity,
  addInFavorites,
  deleteFavorite,
  init,
  deleteAllCart,
} = userSlice.actions;

export default userSlice.reducer;

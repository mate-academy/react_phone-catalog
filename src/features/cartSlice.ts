/* eslint-disable no-param-reassign */
import { Dispatch, PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { RootState } from '../app/store';

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

const initialState: CartItem[] = [];

const KEY = 'cart';

const updateLocalStorage = (state: CartItem[]) => {
  localStorage.setItem(KEY, JSON.stringify(state));
};

const getLocalCart = (): CartItem[] => {
  const cartLocal = localStorage.getItem(KEY);

  if (cartLocal === null) {
    return [];
  }

  try {
    return JSON.parse(cartLocal);
  } catch (error) {
    localStorage.clear();

    return [];
  }
};

export const cartSlice: Slice<CartItem[]> = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    createInCart: (state, { payload }: PayloadAction<Product>) => {
      const isNotInCart =
        state.find(stateItem => stateItem.id === payload.id) === undefined;

      if (isNotInCart) {
        state.push({ id: payload.id, quantity: 1, product: payload });
      }
    },
    deleteFromCart: (state, { payload }: PayloadAction<number>) => {
      return state.filter(product => product.id !== payload);
    },
    increaseInCart: (state, { payload }: PayloadAction<Product>) => {
      let productAdded = false;

      state.forEach(cartItem => {
        const productFound = cartItem.id === payload.id;

        if (productFound) {
          productAdded = true;
          cartItem.quantity++;
        }
      });

      if (!productAdded) {
        state.push({ id: payload.id, quantity: 1, product: payload });
      }
    },
    decreaseInCart: (state, { payload }: PayloadAction<number>) => {
      let productRemoved = false;

      const newState = state.map((stateItem): CartItem => {
        const quantityCanBeDecreased =
          stateItem.id === payload && stateItem.quantity > 1;

        if (quantityCanBeDecreased) {
          productRemoved = true;
        }

        return {
          id: stateItem.id,
          quantity: quantityCanBeDecreased
            ? stateItem.quantity - 1
            : stateItem.quantity,
          product: stateItem.product,
        };
      });

      if (!productRemoved) {
        newState.filter(product => product.id !== payload);
      }

      return newState;
    },
    clearCart: () => [],
  },
});

export const {
  createInCart,
  deleteFromCart,
  increaseInCart,
  decreaseInCart,
  clearCart,
} = cartSlice.actions;

export const createInCartWithLocal = (product: Product) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(createInCart(product));

    const state = getState();

    updateLocalStorage(state.cart);
  };
};

export const deleteFromCartWithLocal = (id: number) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(deleteFromCart(id));

    const state = getState();

    updateLocalStorage(state.cart);
  };
};

export const increaseInCartWithLocal = (product: Product) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(increaseInCart(product));

    const state = getState();

    updateLocalStorage(state.cart);
  };
};

export const decreaseInCartWithLocal = (id: number) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(decreaseInCart(id));

    const state = getState();

    updateLocalStorage(state.cart);
  };
};

export const initiateCartFromLocal = () => {
  return (dispatch: Dispatch) => {
    const localCart = getLocalCart();

    localCart.forEach(localCartItem =>
      dispatch(createInCart(localCartItem.product)),
    );
  };
};

export const clearCartWithLocal = () => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(clearCart(''));

    const state = getState();

    updateLocalStorage(state.cart);
  };
};

export default cartSlice.reducer;

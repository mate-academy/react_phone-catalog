import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UpdatedProduct } from '../types/UpdatedProduct';
import { Product } from '../types/Product';

type CartState = {
  productsOfCart: UpdatedProduct[];
};

const initialState: CartState = {
  productsOfCart: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const updatedLocalStorage = (products: UpdatedProduct[]) => {
  localStorage.setItem('cart', JSON.stringify(products));
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const { id } = action.payload;

      const existProduct = state.productsOfCart.find(item => item.id === id);

      if (existProduct) {
        if (existProduct.quantity !== undefined) {
          existProduct.quantity += 1;
        } else {
          state.productsOfCart.push({ ...existProduct, quantity: 1 });
        }
      } else {
        state.productsOfCart.push({ ...action.payload, quantity: 1 });
      }

      updatedLocalStorage(state.productsOfCart);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.productsOfCart = state.productsOfCart.filter(
        item => item.id !== action.payload,
      );
      updatedLocalStorage(state.productsOfCart);
    },

    clearCart: state => {
      // eslint-disable-next-line no-param-reassign
      state.productsOfCart = [];
      updatedLocalStorage(state.productsOfCart);
    },

    increment: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.productsOfCart.findIndex(item => item.id === id);

      if (index !== -1) {
        // eslint-disable-next-line no-param-reassign
        state.productsOfCart[index].quantity += 1;
      }

      updatedLocalStorage(state.productsOfCart);
    },

    decrement: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.productsOfCart.findIndex(item => item.id === id);

      if (index !== -1) {
        if (state.productsOfCart[index].quantity === 1) {
          return;
        }

        if (state.productsOfCart[index].quantity > 1) {
          // eslint-disable-next-line no-param-reassign
          state.productsOfCart[index].quantity -= 1;
        } else {
          state.productsOfCart.splice(index, 1);
        }
      }

      updatedLocalStorage(state.productsOfCart);
    },
  },
});

export default CartSlice.reducer;
export const { addToCart, removeFromCart, increment, decrement, clearCart } =
  CartSlice.actions;

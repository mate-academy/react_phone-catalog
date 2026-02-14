import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductInCart } from '../types/ProductInCart';
import { Product } from '../types/Product';

type CartState = {
  productsInCart: ProductInCart[];
};

const initialState: CartState = {
  productsInCart: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const updatedLocalStorage = (products: ProductInCart[]) => {
  localStorage.setItem('cart', JSON.stringify(products));
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const { id } = action.payload;

      const aviableProduct = state.productsInCart.find(item => item.id === id);

      if (aviableProduct) {
        if (aviableProduct.quantity !== undefined) {
          aviableProduct.quantity += 1;
        } else {
          state.productsInCart.push({ ...aviableProduct, quantity: 1 });
        }
      } else {
        state.productsInCart.push({ ...action.payload, quantity: 1 });
      }

      updatedLocalStorage(state.productsInCart);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.productsInCart = state.productsInCart.filter(
        item => item.id !== action.payload,
      );
      updatedLocalStorage(state.productsInCart);
    },

    clearCart: state => {
      // eslint-disable-next-line no-param-reassign
      state.productsInCart = [];
      updatedLocalStorage(state.productsInCart);
    },

    increment: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.productsInCart.findIndex(item => item.id === id);

      if (index !== -1) {
        // eslint-disable-next-line no-param-reassign
        state.productsInCart[index].quantity += 1;
      }

      updatedLocalStorage(state.productsInCart);
    },

    decrement: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.productsInCart.findIndex(item => item.id === id);

      if (index !== -1) {
        if (state.productsInCart[index].quantity === 1) {
          return;
        }

        if (state.productsInCart[index].quantity > 1) {
          // eslint-disable-next-line no-param-reassign
          state.productsInCart[index].quantity -= 1;
        } else {
          state.productsInCart.splice(index, 1);
        }
      }

      updatedLocalStorage(state.productsInCart);
    },
  },
});

export default CartSlice.reducer;
export const { addToCart, removeFromCart, increment, decrement, clearCart } =
  CartSlice.actions;

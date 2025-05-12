import { createSlice } from '@reduxjs/toolkit';
import { CartProduct } from '../../types/types';

const loadCartFromLocalStorage = (): CartProduct[] => {
  const savedCart = localStorage.getItem('cart');

  return savedCart ? (JSON.parse(savedCart) as CartProduct[]) : [];
};

const saveCartToLocalStorage = (cart: CartProduct[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage() as CartProduct[],
  reducers: {
    addToCart: (cart, action) => {
      const index = cart.findIndex(product => product.id === action.payload.id);

      let updatedCart;

      if (index !== -1) {
        updatedCart = cart.map((product, i) =>
          i === index ? { ...product, amount: product.amount + 1 } : product,
        );
      } else {
        updatedCart = [...cart, { ...action.payload, amount: 1 }];
      }

      saveCartToLocalStorage(updatedCart);

      return updatedCart;
    },

    decreaseAmount: (cart, action) => {
      const index = cart.findIndex(product => product.id === action.payload.id);
      let updatedCart = cart;

      if (index !== -1) {
        const product = cart[index];

        if (product.amount > 1) {
          updatedCart = cart.map((p, i) =>
            i === index ? { ...p, amount: p.amount - 1 } : p,
          );
        } else {
          updatedCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
        }

        saveCartToLocalStorage(updatedCart);
      }

      return updatedCart;
    },

    removeFromCart: (cart, action) => {
      const updatedCart = cart.filter(
        product => product.id !== action.payload.id,
      );

      saveCartToLocalStorage(updatedCart);

      return updatedCart;
    },

    clearCart: () => {
      saveCartToLocalStorage([]);

      return [];
    },
  },
});

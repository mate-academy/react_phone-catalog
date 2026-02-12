/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);

      const totalQuantity = parsedCart.reduce((total, item) =>
        total + item.quantity, 0);
      const totalPrice = parsedCart.reduce((total, item) =>
        total + item.price * item.quantity, 0);

      return {
        items: parsedCart,
        totalQuantity,
        totalPrice,
      };
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Помилка завантаження з localStorage:', error);
  }

  return {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  };
};

const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Помилка збереження в localStorage:', error);
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItemIndex = state.items
        .findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += product.price;

      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.id === productId);

      if (!existingItem) {
        return;
      }

      state.totalQuantity -= existingItem.quantity;
      state.totalPrice -= existingItem.price * existingItem.quantity;
      state.items = state.items.filter(item => item.id !== productId);

      saveCartToStorage(state.items);
    },

    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === productId);

      if (!existingItem) {
        return;
      }

      const quantityDifference = quantity - existingItem.quantity;

      existingItem.quantity = quantity;

      state.totalQuantity += quantityDifference;
      state.totalPrice += existingItem.price * quantityDifference;

      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      saveCartToStorage([]);
    },

    syncWithStorage: (state) => {
      const storedCart = loadCartFromStorage();

      state.items = storedCart.items;
      state.totalQuantity = storedCart.totalQuantity;
      state.totalPrice = storedCart.totalPrice;
    },
  },
});

export const currentCartItems = (state) => state.cart.items;
export const currentCartTotalQuantity = (state) => state.cart.totalQuantity;
export const currentCartTotalPrice = (state) => state.cart.totalPrice;
export const isProductInCart = (state, productId) =>
  state.cart.items.some(item => item.id === productId);
export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  syncWithStorage,
} = cartSlice.actions;
export default cartSlice.reducer;

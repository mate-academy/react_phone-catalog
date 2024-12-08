import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '../api/api';
import { Product } from '../types/product';

type InitialState = {
  products: Product[];
  loaded: boolean;
  hasError: boolean;
  favourites: Product[];
  cartItems: Product[];
  quantity: { [key: string]: number };
  totalPrice: number | null;
};

const storedFavourites = localStorage.getItem('favourites');
const storedCartItems = localStorage.getItem('cartItems');
const storedQuantities = localStorage.getItem('quantities');

const initialState: InitialState = {
  products: [],
  loaded: false,
  hasError: false,
  favourites: storedFavourites ? JSON.parse(storedFavourites) : [],
  cartItems: storedCartItems ? JSON.parse(storedCartItems) : [],
  quantity: storedQuantities ? JSON.parse(storedQuantities) : {},
  totalPrice: null,
};

export const init = createAsyncThunk('products/fetch', () => {
  return getProducts();
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFavourites: (state: InitialState, action: PayloadAction<string | null>) => {
      const favouriteProduct = state.products.find(product =>
        product.itemId === action.payload);

        if (!favouriteProduct) { 
          return
        };

      const isFavourite = state.favourites.some(
        favourite => favourite.itemId === favouriteProduct.itemId,
      );

      if (isFavourite) {
        state.favourites = state.favourites.filter(
          favourite => favourite.itemId !== favouriteProduct.itemId,
        );
      } else {
        state.favourites = [...state.favourites, favouriteProduct];;
      }

      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },

    setCartItems: (
      state: InitialState,
      action: PayloadAction<string | null>,
    ) => {
      const cartItemProduct = state.products.find(product =>
        product.itemId === action.payload);

        if (!cartItemProduct) { 
          return
        };

      if (cartItemProduct) {
        const isCartItem = state.cartItems.some(item =>
          item.itemId === cartItemProduct.itemId,
        );

        if (!isCartItem) {
          state.cartItems.push(cartItemProduct);
          state.quantity[cartItemProduct.itemId] = 1;
        }
      } else {
        state.cartItems = [];
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('quantities', JSON.stringify(state.quantity));
    },

    deleteCartItem: (state: InitialState, action: PayloadAction<string | null>) => {
      const cartItemProduct = state.products.find(
        product => product.itemId === action.payload,
      );

        state.cartItems = state.cartItems.filter(
          item => item.itemId !== cartItemProduct?.itemId,
        );

      if (cartItemProduct) {
        delete state.quantity[cartItemProduct.itemId];
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('quantities', JSON.stringify(state.quantity));
    },

    setQuantity: (
      state: InitialState,
      action: PayloadAction<{ itemId: string; increment: boolean }>,
    ) => {
      const { itemId, increment } = action.payload;
      const currentQuantity = state.quantity[itemId] || 1;

      if (increment) {
        state.quantity[itemId] = currentQuantity + 1;
      } else if (currentQuantity > 1) {
        state.quantity[itemId] = currentQuantity - 1;
      }
    },

    setTotalPrice: (state: InitialState, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      state.loaded = true;
    });

    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loaded = false;
      },
    );

    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});

export default productsSlice.reducer;
export const {
  setFavourites,
  setCartItems,
  deleteCartItem,
  setQuantity,
  setTotalPrice,
} = productsSlice.actions;

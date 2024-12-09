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
const storedCardItems = localStorage.getItem('cartItems');
const storedQuantities = localStorage.getItem('quantities');

const initialState: InitialState = {
  products: [],
  loaded: false,
  hasError: false,
  favourites: storedFavourites ? JSON.parse(storedFavourites) : [],
  cartItems: storedCardItems? JSON.parse(storedCardItems) : [],
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
    setFavourites: (
      state: InitialState,
      action: PayloadAction<string | null>,
    ) => {
      const isFavourite = state.favourites.some(
        favourite => favourite.itemId === action.payload,
      );

      if (isFavourite) {
        state.favourites = state.favourites.filter(
          favourite => favourite.itemId !== action.payload,
        );
      } else {
        const product = state.products.find(
          product => product.itemId === action.payload,
        );

        if (!product) {
          return;
        }

        state.favourites.push(product);
      }
    },

    setCartItems: (
      state: InitialState,
      action: PayloadAction<string | null>,
    ) => {
      if (action.payload === null) {
        state.cartItems = [];
        state.quantity = {};
        return;
      }

      const isCartItem = state.cartItems.some(
        item => item.itemId === action.payload,
      );
      
      if (!isCartItem) {
        const product = state.products.find(
          product => product.itemId === action.payload,
        );

        console.log(product, 'Це продукт', state.products, 'Це state');
        
        if (!product) {
          return;
        }
        
        state.cartItems.push(product);
        state.quantity[product.itemId] = 1;
      }
    },

    deleteCartItem: (
      state: InitialState,
      action: PayloadAction<string | null>,
    ) => {
      state.cartItems = state.cartItems.filter(
        item => item.itemId !== action.payload,
      );

      console.log('delete', state.cartItems);

      if (action.payload) {
        delete state.quantity[action.payload];
      }
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

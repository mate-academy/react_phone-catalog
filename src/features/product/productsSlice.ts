/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { getPhones } from '../../api/api';

export type ProductState = {
  phones: Product[];
  product: Product | null;
  favourites: Product[];
  cart: Product[];
  search: string;
  error: boolean;
  loading: boolean;
};

const initialState: ProductState = {
  phones: [],
  product: null,
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  search: '',
  error: false,
  loading: false,
};

export const thunkGetPhones = createAsyncThunk('phones/fetchPhones', () => {
  return getPhones();
});

const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
    setProductNull: state => {
      state.product = null;
    },
    addToFavourites: (state, action: PayloadAction<Product>) => {
      state.favourites.push(action.payload);
    },
    removeFavourite: (state, action: PayloadAction<Product>) => {
      state.favourites = state.favourites.filter(
        favourite => favourite.id !== action.payload.id,
      );
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const copy = [...state.cart].reverse();
      const index = copy.findIndex(item => item.id === action.payload.id);

      copy.splice(index, 1);

      state.cart = [...copy].reverse();
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
    clearCart: state => {
      state.cart = [];
    },
    addSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    removeSearch: state => {
      state.search = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(thunkGetPhones.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        thunkGetPhones.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.phones = action.payload;
          state.loading = false;
        },
      )
      .addCase(thunkGetPhones.rejected, state => {
        state.error = true;
      });
  },
});

export const {
  setProduct,
  setProductNull,
  addToFavourites,
  removeFavourite,
  addToCart,
  removeFromCart,
  addSearch,
  removeSearch,
  clearCart,
  removeProduct,
} = phonesSlice.actions;

export default phonesSlice.reducer;

/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPhones } from '../../api/api';
import { Product } from '../../types/Product';

export interface ProductState {
  phones: Product[];
  phone: Product | null;
  favourites: Product[];
  cart: Product[];
  error: boolean,
  loading: boolean,
}

const initialState: ProductState = {
  phones: [],
  phone: null,
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  error: false,
  loading: false,
};

export const thunkGetPhones = createAsyncThunk(
  'phones/fetchPhones', () => {
    return getPhones();
  },
);

const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.phone = action.payload;
    },
    addToFavourites: (state, action: PayloadAction<Product>) => {
      state.favourites.push(action.payload);
    },
    removeFavourite: (state, action: PayloadAction<Product>) => {
      state.favourites = state.favourites
        .filter(favoutire => favoutire.id !== action.payload.id);
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      state.cart = state.cart
        .filter(pr => pr.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkGetPhones.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(thunkGetPhones.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.phones = action.payload;
          state.loading = false;
        })
      .addCase(thunkGetPhones.rejected, (state) => {
        state.error = true;
      });
  },
});

export const {
  setProduct,
  addToFavourites,
  removeFavourite,
  addToCart,
  removeFromCart,
} = phonesSlice.actions;

export default phonesSlice.reducer;

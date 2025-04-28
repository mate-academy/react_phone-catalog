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
  cartItems: storedCardItems ? JSON.parse(storedCardItems) : [],
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
        const favouriteFilter = state.favourites.filter(
          favourite => favourite.itemId !== action.payload,
        );

        return { ...state, favourites: favouriteFilter };
      } else {
        const product = state.products.find(
          item => item.itemId === action.payload,
        );

        if (!product) {
          return state;
        }

        return { ...state, favourites: [...state.favourites, product] };
      }
    },

    setCartItems: (
      state: InitialState,
      action: PayloadAction<string | null>,
    ) => {
      if (action.payload === null) {
        return { ...state, cartItems: [], quantity: {} };
      }

      const isCartItem = state.cartItems.some(
        item => item.itemId === action.payload,
      );

      if (!isCartItem) {
        const product = state.products.find(
          item => item.itemId === action.payload,
        );

        if (!product) {
          return;
        }

        return {
          ...state,
          cartItems: [...state.cartItems, product],
          quantity: { ...state.quantity, [product.itemId]: 1 },
        };
      }

      return state;
    },

    deleteCartItem: (
      state: InitialState,
      action: PayloadAction<string | null>,
    ) => {
      if (!action.payload) {
        return state;
      }

      const newCartItems = state.cartItems.filter(
        item => item.itemId !== action.payload,
      );

      const { [action.payload]: removedItem, ...newQuantity } = state.quantity;

      return {
        ...state,
        cartItems: newCartItems,
        quantity: newQuantity,
      };
    },

    setQuantity: (
      state: InitialState,
      action: PayloadAction<{ itemId: string; increment: boolean }>,
    ) => {
      const { itemId, increment } = action.payload;
      const currentQuantity = state.quantity[itemId] || 1;

      const updatedQuantity = { ...state.quantity };

      if (increment) {
        updatedQuantity[itemId] = currentQuantity + 1;
      } else if (currentQuantity > 1) {
        updatedQuantity[itemId] = currentQuantity - 1;
      }

      return {
        ...state,
        quantity: updatedQuantity,
      };
    },

    setTotalPrice: (state: InitialState, action: PayloadAction<number>) => {
      return { ...state, totalPrice: action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: true };
    });

    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        return { ...state, products: action.payload, loaded: false };
      },
    );

    builder.addCase(init.rejected, state => {
      return { ...state, hasError: true, loaded: false };
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

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabAccessPhone } from '../types/tabAccessPhones';

export interface CardProduct {
  count: number;
  product: TabAccessPhone;
}

export type CardInfo = {
  cartProducts: CardProduct[],
  loading: boolean;
  error?: boolean;
}

const initialState: CardInfo = {
  cartProducts: [],
  loading: false,
};

export const removeProduct = createAsyncThunk(
  'cartRemover',
  async (id: string) => {

    const payloadParams = {
      id
    }
    
    const myPromise = new Promise<typeof payloadParams>((resolve) => {
      setTimeout(() => {
        resolve(payloadParams);
      }, 1000);
    });

    return await myPromise;
  }
);

const CartSlice = createSlice({
  name: 'cartProducts',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TabAccessPhone>) => {
      const currentState = state;

      const findProduct = currentState.cartProducts.find(prod => 
        prod.product.id === action.payload.id)

        if (findProduct) {
          findProduct.count += 1
        } else {
          currentState.cartProducts.push({
          count: 1,
          product: action.payload
        });
      }
    },

    removeLastProduct: (state, action: PayloadAction<TabAccessPhone>) => {
      const currentState = state;

      const findProduct = currentState.cartProducts.find(prod => 
        prod.product.id === action.payload.id)

      if (findProduct) {
        findProduct.count -= 1
      }
    },
  },

  extraReducers: builder => {
    builder
    .addCase(removeProduct.pending, state => {
      const currentState = state;

      currentState.loading = true;
    })
    .addCase(removeProduct.fulfilled, (state, action) => {
      const currentState = state;

      currentState.loading = false;

      currentState.cartProducts = currentState.cartProducts.filter(
        product => product.product.id !== action.payload.id,
      );
    })
    .addCase(removeProduct.rejected, state => {
      const currentState = state;
      currentState.loading = false;
      currentState.error = true;
    })
  }
});

export const { actions } = CartSlice;
export default CartSlice.reducer;

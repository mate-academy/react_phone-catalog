import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CardProduct {
  count: number;
  productId: string;
}

export type CardInfo = {
  cartProducts: CardProduct[];
  loading: boolean;
  error?: boolean;
};

const initialState: CardInfo = {
  cartProducts: [],
  loading: false,
};

export const removeProduct = createAsyncThunk(
  'cartRemover',
  async (id: string) => {
    const payloadParams = {
      id,
    };

    const myPromise = new Promise<typeof payloadParams>(resolve => {
      setTimeout(() => {
        resolve(payloadParams);
      }, 1000);
    });

    return myPromise;
  },
);

const CartSlice = createSlice({
  name: 'cartProducts',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<string>) => {
      const currentState = state;

      const findProduct = currentState.cartProducts.find(
        prod => prod.productId === action.payload,
      );

      if (findProduct) {
        findProduct.count += 1;
      } else {
        currentState.cartProducts.push({
          count: 1,
          productId: action.payload,
        });
      }
    },

    removeLastProduct: (state, action: PayloadAction<string>) => {
      const currentState = state;

      const findProduct = currentState.cartProducts.find(
        prod => prod.productId === action.payload,
      );

      if (findProduct) {
        findProduct.count -= 1;
      }
    },

    removeAll: state => {
      const currentState = state;

      currentState.cartProducts = [];
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
          product => product.productId !== action.payload.id,
        );
      })
      .addCase(removeProduct.rejected, state => {
        const currentState = state;

        currentState.loading = false;
        currentState.error = true;
      });
  },
});

export const { actions } = CartSlice;
export default CartSlice.reducer;

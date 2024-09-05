/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BucketProduct } from '../types/products';

interface AddBucketSlice {
  items: BucketProduct[];
}

const initialState: AddBucketSlice = {
  items: JSON.parse(localStorage.getItem('bucket') || '[]'),
};

const addBucketSlice = createSlice({
  name: 'addBucket',
  initialState,
  reducers: {
    addBucket: (state, action: PayloadAction<BucketProduct>) => {
      const exists = state.items.find(item => item.id === action.payload.id);

      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('bucket', JSON.stringify(state.items));
      }
    },
    removeBucket: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('bucket', JSON.stringify(state.items));
    },
    addQuantity: (state, action: PayloadAction<number>) => {
      const product = state.items.find(item => item.id === action.payload);

      if (product) {
        product.quantity += 1;
        localStorage.setItem('bucket', JSON.stringify(state.items));
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const product = state.items.find(item => item.id === action.payload);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
        localStorage.setItem('bucket', JSON.stringify(state.items));
      }
    },
    clearBucket: state => {
      state.items = [];
    },
  },
});

export const {
  addBucket,
  removeBucket,
  addQuantity,
  decrementQuantity,
  clearBucket,
} = addBucketSlice.actions;

export default addBucketSlice.reducer;

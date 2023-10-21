import { createSlice } from '@reduxjs/toolkit';

export interface ProductForCart {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  phoneId: string;
  itemId: string;
  category: string;
}

export interface CartSliceState {
  items: ProductForCart[]
}

const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: [],
  } as CartSliceState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = state.items.filter(obj => obj.id !== action.payload);
    },
    addQuantity(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id);

      if (findItem) {
        // eslint-disable-next-line no-plusplus
        findItem.quantity++;
      }
    },
    subQuantity(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id);

      if (findItem) {
        // eslint-disable-next-line no-plusplus
        findItem.quantity--;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  subQuantity,
  addQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

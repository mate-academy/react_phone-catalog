import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StorageItem } from '../../types/StorageItem';
import {
  getLocalStorageItems,
  setLocalStorageItems,
} from '../../localStorage/localStorage';

const name = 'cartItems';
const initialState = getLocalStorageItems<StorageItem[]>(name, []);

const cartItemsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCartItems: (_, action: PayloadAction<StorageItem[]>) => {
      setLocalStorageItems<StorageItem[]>(name, action.payload);

      return action.payload;
    },

    clearCartItems: () => {
      setLocalStorageItems<StorageItem[]>(name, []);

      return [];
    },
  },
});

export default cartItemsSlice.reducer;
export const { setCartItems, clearCartItems } = cartItemsSlice.actions;
export const selectCartItems = (state: RootState) => state.cartItems;

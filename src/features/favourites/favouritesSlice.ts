import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  AccessoryType,
  PhoneType,
  ProductType,
  TabletType,
} from '../../types/Product';

export type Device = PhoneType | AccessoryType | TabletType;

const data = localStorage.getItem('favItems');
const initialFavour: ProductType[] = JSON.parse(data as string) || [];

const initialState = {
  listOfDevices: initialFavour,
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addDevice: (state, action: PayloadAction<ProductType>) => {
      const deviceId = action.payload.itemId;

      // Перевіряємо, чи існує пристрій
      const productIndex = state.listOfDevices.findIndex(
        el => el.itemId === deviceId,
      );

      if (productIndex !== -1) {
        // Якщо знайдено, видаляємо
        state.listOfDevices.splice(productIndex, 1);
      } else {
        // Якщо не знайдено, додаємо
        state.listOfDevices.push(action.payload);
      }

      localStorage.setItem('favItems', JSON.stringify(state.listOfDevices));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addDevice } = favouritesSlice.actions;

export default favouritesSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AccessoryType } from '../types/productsType';

export interface InitialStateType {
  accessories: AccessoryType[];
}

const initialState: InitialStateType = {
  accessories: [],
};

const accessoriesSlice = createSlice({
  name: 'accesories',
  initialState,
  reducers: {
    setAccessories: (
      state: InitialStateType,
      action: PayloadAction<AccessoryType[]>,
    ) => {
      state.accessories = action.payload;
    },
  },
});

export const { setAccessories } = accessoriesSlice.actions;
export default accessoriesSlice.reducer;

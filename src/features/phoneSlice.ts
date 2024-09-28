import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PhoneType } from '../types/productsType';

export interface InitialStateType {
  phones: PhoneType[];
}

const initialState: InitialStateType = {
  phones: [],
};

const phoneSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    setPhones: (
      state: InitialStateType,
      action: PayloadAction<PhoneType[]>,
    ) => {
      state.phones = action.payload;
    },
  },
});

export const { setPhones } = phoneSlice.actions;
export default phoneSlice.reducer;

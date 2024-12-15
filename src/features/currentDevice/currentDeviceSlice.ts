import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AccessoryType, PhoneType, TabletType } from '../../types/Product';

export interface DeviceState {
  currentDevice: PhoneType | AccessoryType | TabletType | null;
}

const initialState: DeviceState = {
  currentDevice: null,
};

export const currentDeviceSlice = createSlice({
  name: 'currentDevice',
  initialState,
  reducers: {
    setDevice: (
      state,
      action: PayloadAction<null | PhoneType | TabletType | AccessoryType>,
    ) => {
      // eslint-disable-next-line no-param-reassign
      state.currentDevice = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDevice } = currentDeviceSlice.actions;

export default currentDeviceSlice.reducer;

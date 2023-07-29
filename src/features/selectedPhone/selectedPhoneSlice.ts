import { PayloadAction, createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import { Phone } from '../../types/Phone';
import { SelectedStatus } from '../../types/SelectedStatus';

export interface SelectedPhoneReducer {
  value: Phone | null,
  status: SelectedStatus
}

const initialState: SelectedPhoneReducer = {
  value: null,
  status: SelectedStatus.UNSELECTED,
};

const selectedPhoneReducer = createSlice({
  name: 'selectedPhone',
  initialState,
  reducers: {
    setPhone: (state, action: PayloadAction<Phone>) => {
      state.status = SelectedStatus.SELECTED;
      state.value = action.payload;
    },
    unsetPhone: (state) => {
      state.status = SelectedStatus.UNSELECTED;
      state.value = null;
    },
  },
});

export const { reducer } = selectedPhoneReducer;
export const { setPhone, unsetPhone } = selectedPhoneReducer.actions;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import { Product } from '../../types/Product';
import { SelectedStatus } from '../../types/SelectedStatus';
// eslint-disable-next-line import/no-cycle
import { KeyJson, SavedCard } from '../../pages/CardPage';

export interface CardPhoneReducer {
  value: Product[],
  status: SelectedStatus
}
const localeStorage = window.localStorage.getItem(KeyJson.CARD);

const initialState: CardPhoneReducer = {
  value: localeStorage ? JSON.parse(localeStorage).map(
    (card: SavedCard) => card.value,
  ) : [],
  status: SelectedStatus.UNSELECTED,
};

const cardedPhoneReducer = createSlice({
  name: 'cardedPhone',
  initialState,
  reducers: {
    setInCardPhone: (state, action: PayloadAction<Product>) => {
      state.status = SelectedStatus.SELECTED;
      state.value.push(action.payload);
    },
    unsetFromCardPhone: (state, action: PayloadAction<Product>) => {
      state.status = SelectedStatus.UNSELECTED;
      state.value = state.value.filter(phone => phone.id !== action.payload.id);
    },
  },
});

export const { reducer } = cardedPhoneReducer;
export const {
  setInCardPhone, unsetFromCardPhone,
} = cardedPhoneReducer.actions;

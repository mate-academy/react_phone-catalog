import { PayloadAction, createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import { Product } from '../../types/Product';
import { SelectedStatus } from '../../types/SelectedStatus';
import { SavedCard } from '../../types/SavedCard';
import { KeyJson } from '../../types/KeyJson';
// eslint-disable-next-line import/no-cycle

export interface CardPhoneReducer {
  value: SavedCard[],
  status: SelectedStatus
}
const localeStorage = window.localStorage.getItem(KeyJson.CARD);
const cardsFormStorage: SavedCard[] | null = localeStorage
  ? JSON.parse(localeStorage) : null;

const initialState: CardPhoneReducer = {
  value: cardsFormStorage || [],
  status: SelectedStatus.UNSELECTED,
};

const cardedPhoneReducer = createSlice({
  name: 'cardedPhones',
  initialState,
  reducers: {
    setInCardPhone: (state, action: PayloadAction<Product>) => {
      state.status = SelectedStatus.SELECTED;
      state.value.push({
        id: action.payload.itemId,
        amount: 1,
        value: action.payload,
      });
    },
    unsetFromCardPhone: (state, action: PayloadAction<Product>) => {
      state.status = SelectedStatus.UNSELECTED;
      state.value = state.value.filter(
        phone => phone.id !== action.payload.itemId,
      );
    },
  },
});

export const { reducer } = cardedPhoneReducer;
export const {
  setInCardPhone, unsetFromCardPhone,
} = cardedPhoneReducer.actions;

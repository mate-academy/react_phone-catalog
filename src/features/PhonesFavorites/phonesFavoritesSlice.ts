import { PayloadAction, createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import { Product } from '../../types/Product';
import { SelectedStatus } from '../../types/SelectedStatus';

export interface FavoritePhoneReducer {
  value: Product[],
  status: SelectedStatus
}

const initialState: FavoritePhoneReducer = {
  value: [],
  status: SelectedStatus.UNSELECTED,
};

const favoritePhoneReducer = createSlice({
  name: 'likedPhone',
  initialState,
  reducers: {
    setFavoritePhone: (state, action: PayloadAction<Product>) => {
      state.status = SelectedStatus.SELECTED;
      state.value.push(action.payload);
    },
    unsetFavoritePhone: (state, action: PayloadAction<Product>) => {
      state.status = SelectedStatus.UNSELECTED;
      state.value = state.value.filter(phone => phone.id !== action.payload.id);
    },
  },
});

export const { reducer } = favoritePhoneReducer;
export const {
  setFavoritePhone, unsetFavoritePhone,
} = favoritePhoneReducer.actions;

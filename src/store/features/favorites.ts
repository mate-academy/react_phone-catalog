/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Phone } from '../../types/Phone';
import { allPhones } from './phones';

type State = {
  favStorage: Phone[],
};

const storage = localStorage.getItem('likes');

const initialState: State = {
  favStorage: storage ? JSON.parse(storage) : [],
};

function setLocalStorage(newValue: Phone[]) {
  localStorage.setItem('likes', JSON.stringify(newValue));
}

const favorite = createSlice({
  name: 'favoriteStorage',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const { phones } = allPhones.getInitialState();

      const product = phones
        .find((currPhone: Phone) => currPhone.phoneId === action.payload);

      const sameLike = state.favStorage.filter(like => like.id !== product?.id);

      if (sameLike.length !== state.favStorage.length) {
        state.favStorage = sameLike;

        return;
      }

      if (product) {
        state.favStorage.push(product as Phone);
        setLocalStorage(state.favStorage);
      }
    },
  },
});

export const { toggleLike } = favorite.actions;
export default favorite.reducer;

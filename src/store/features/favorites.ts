/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Phone } from '../../types/Phone';

type State = {
  favStorage: Phone[],
  phones: Phone[],
};

const storage = localStorage.getItem('likes');

const initialState: State = {
  favStorage: storage ? JSON.parse(storage) : [],
  phones: [],
};

function setLocalStorage(newValue: Phone[]) {
  localStorage.setItem('likes', JSON.stringify(newValue));
}

const favorite = createSlice({
  name: 'favoriteStorage',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const product = state.phones
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

    addPhonesToFavorite: (state, action: PayloadAction<Phone[]>) => {
      state.phones = action.payload;
    },
  },
});

export const { toggleLike, addPhonesToFavorite } = favorite.actions;
export default favorite.reducer;

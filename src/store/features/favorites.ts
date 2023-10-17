/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Phone } from '../../types/Phone';

type State = {
  favStorage: Phone[],
  addedToFav: string[],
};

const storage = localStorage.getItem('likes');

const initialState: State = {
  favStorage: storage ? JSON.parse(storage) : [],
  addedToFav: [],
};

function setLocalStorage(newValue: Phone[]) {
  localStorage.setItem('likes', JSON.stringify(newValue));
}

const favorite = createSlice({
  name: 'favoriteStorage',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<Phone>) => {
      const findProduct = state.favStorage
        .find(like => like.id === action.payload.id);

      if (findProduct) {
        state.favStorage = state.favStorage
          .filter(like => like.id !== action.payload.id);
        state.addedToFav = state.addedToFav
          .filter(like => like !== action.payload.itemId);

        setLocalStorage(state.favStorage);

        return;
      }

      state.favStorage.push(action.payload);
      state.addedToFav.push(action.payload.itemId);
      setLocalStorage(state.favStorage);
    },
  },
});

export const { toggleLike } = favorite.actions;
export default favorite.reducer;

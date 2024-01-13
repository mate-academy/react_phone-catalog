/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type Modal = {
  shouldCartModalBeShow: boolean,
  shouldFavouriteModalBeShow: boolean,
};

const initialState: Modal = {
  shouldCartModalBeShow: false,
  shouldFavouriteModalBeShow: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setCartModal: (state) => {
      state.shouldCartModalBeShow = true;
    },
    hideCartModal: (state) => {
      state.shouldCartModalBeShow = false;
    },
    setFavouriteModal: (state) => {
      state.shouldFavouriteModalBeShow = true;
    },
    hideFavouriteModal: (state) => {
      state.shouldFavouriteModalBeShow = false;
    },
  },
});

export default modalSlice.reducer;
export const {
  setCartModal,
  hideCartModal,
  setFavouriteModal,
  hideFavouriteModal,
} = modalSlice.actions;

export const showCartModal = createAsyncThunk(
  'modal/showCartModal',
  async (_, { dispatch }) => {
    dispatch(setCartModal());

    setTimeout(() => {
      dispatch(hideCartModal());
    }, 1000);
  },
);

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type ModalWindowState = {
  isModal: boolean;
};

const initialState: ModalWindowState = {
  isModal: false,
};

const modalWindowSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModal = true;
    },

    closeModal: (state) => {
      state.isModal = false;
    },
  },
});

export const { openModal, closeModal } = modalWindowSlice.actions;

export default modalWindowSlice.reducer;

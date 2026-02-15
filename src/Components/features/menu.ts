/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type MenuState = {
  isOpen: boolean;
};

const initialState: MenuState = {
  isOpen: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: state => {
      state.isOpen = !state.isOpen;
    },
    closeMenu: state => {
      state.isOpen = false;
    },
  },
});

export const { toggleMenu, closeMenu } = menuSlice.actions;

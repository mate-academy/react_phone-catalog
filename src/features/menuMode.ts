import { createSlice } from '@reduxjs/toolkit';
import { MenuMode } from '../types/MenuMode';

const initialState = MenuMode.CLOSE;

export const menuModeSlice = createSlice({
  name: 'menuMode',
  initialState,
  reducers: {
    setIsOpen: () => MenuMode.OPEN,
    setIsClose: () => MenuMode.CLOSE,
  },
});

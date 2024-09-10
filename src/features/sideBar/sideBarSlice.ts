import { createSlice } from '@reduxjs/toolkit';
import { SideBarState } from '../../types/SideBarState';

const initialState: SideBarState = {
  isOpen: false,
};

export const sideBarSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleMenu } = sideBarSlice.actions;
export default sideBarSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';

export interface AppState {
  isOpenMenu: boolean;
}

const initialState: AppState = {
  isOpenMenu: false,
};

export const settingsSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenuReducer: state => {
      state.isOpenMenu = !state.isOpenMenu;
    },
  },
});

export const selectMenu = (state: RootState) => state.menu.isOpenMenu;

export const { toggleMenuReducer } = settingsSlice.actions;

export const toggleMenu = (): AppThunk => {
  return dispatch => {
    dispatch(toggleMenuReducer());
  };
};

export default settingsSlice.reducer;

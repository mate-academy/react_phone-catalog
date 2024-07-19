/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice, Slice } from '@reduxjs/toolkit';

export interface ActionState {
  theme: string;
}

const loadStateFromLocalStorage = (): ActionState => {
  const theme = localStorage.getItem('theme');

  return {
    theme: theme && JSON.parse(theme),
  };
};

const saveStateToLocalStorage = (state: ActionState) => {
  localStorage.setItem('theme', JSON.stringify(state.theme));
};

const initialState: ActionState = loadStateFromLocalStorage();

const themeSlice: Slice<ActionState> = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;

      saveStateToLocalStorage(state);
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface dropdownState {
  activeDropdown: 'sort' | 'perPage' | null;
}

const initialState: dropdownState = {
  activeDropdown: null,
};

export const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {
    setActiveDropdown: (
      state,
      action: PayloadAction<'sort' | 'perPage' | null>,
    ) => {
      state.activeDropdown = action.payload;
    },
  },
});

export default dropdownSlice.reducer;

export const { setActiveDropdown } = dropdownSlice.actions;

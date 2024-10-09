import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface InitialStateType {
  searchValue: string;
  isFocused: boolean;
}

const initialState: InitialStateType = {
  searchValue: '',
  isFocused: false,
};

const coreSlice = createSlice({
  name: 'backets',
  initialState,
  reducers: {
    setSearchValue: (
      state: InitialStateType,
      action: PayloadAction<string>,
    ) => {
      state.searchValue = action.payload;
    },
    setIsFocused: (state: InitialStateType, action: PayloadAction<boolean>) => {
      state.isFocused = action.payload;
    },
  },
});

export const { setSearchValue, setIsFocused } = coreSlice.actions;
export default coreSlice.reducer;

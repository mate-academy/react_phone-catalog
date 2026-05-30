import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  isOpenNav: boolean;
};

const initialState: CartState = {
  isOpenNav: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenNav = action.payload;
    },
  },
});

export const { openModal } = uiSlice.actions;

export default uiSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface InitialStateType {
  favoritId: string[];
}

const initialState: InitialStateType = {
  favoritId: [],
};

const favoritSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoritId: (state: InitialStateType, action: PayloadAction<string>) => {
      state.favoritId.push(action.payload);
    },
    deleteFavoritId: (
      state: InitialStateType,
      action: PayloadAction<string>,
    ) => {
      state.favoritId = [
        ...state.favoritId.filter(item => item !== action.payload),
      ];
    },
  },
});

export const { addFavoritId, deleteFavoritId } = favoritSlice.actions;
export default favoritSlice.reducer;

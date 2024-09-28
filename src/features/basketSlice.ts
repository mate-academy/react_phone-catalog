import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface InitialStateType {
  backetsId: string[];
}

const initialState: InitialStateType = {
  backetsId: [],
};

const backetSlice = createSlice({
  name: 'backets',
  initialState,
  reducers: {
    addBacketId: (state: InitialStateType, action: PayloadAction<string>) => {
      state.backetsId.push(action.payload);
    },
    deleteBacketId: (
      state: InitialStateType,
      action: PayloadAction<string>,
    ) => {
      state.backetsId = [
        ...state.backetsId.filter(item => item !== action.payload),
      ];
    },
  },
});

export const { addBacketId, deleteBacketId } = backetSlice.actions;
export default backetSlice.reducer;

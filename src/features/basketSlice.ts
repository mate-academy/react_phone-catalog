import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../types/productsType';

type BacketType = {
  itemId: string;
  count: number;
  product: ProductType;
};

export interface InitialStateType {
  backetsId: BacketType[];
}

const initialState: InitialStateType = {
  backetsId: [],
};

const backetSlice = createSlice({
  name: 'backets',
  initialState,
  reducers: {
    addBacketId: (
      state: InitialStateType,
      action: PayloadAction<BacketType>,
    ) => {
      state.backetsId.push(action.payload);
    },
    addCoundBacketId: (
      state: InitialStateType,
      action: PayloadAction<string>,
    ) => {
      state.backetsId = state.backetsId.map(item =>
        item.itemId === action.payload
          ? { ...item, count: item.count + 1 }
          : item,
      );
    },
    subtractionCoundBacketId: (
      state: InitialStateType,
      action: PayloadAction<string>,
    ) => {
      state.backetsId = state.backetsId.map(item =>
        item.itemId === action.payload
          ? { ...item, count: item.count - 1 }
          : item,
      );
    },
    deleteBacketId: (
      state: InitialStateType,
      action: PayloadAction<string>,
    ) => {
      state.backetsId = state.backetsId.filter(
        item => item.itemId !== action.payload,
      );
    },
    clearBacketId: (state: InitialStateType) => {
      state.backetsId = [];
    },
  },
});

export const {
  addBacketId,
  addCoundBacketId,
  subtractionCoundBacketId,
  deleteBacketId,
  clearBacketId,
} = backetSlice.actions;
export default backetSlice.reducer;

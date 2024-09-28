import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TabletType } from '../types/productsType';

export interface InitialStateType {
  tables: TabletType[];
}

const initialState: InitialStateType = {
  tables: [],
};

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    setTables: (
      state: InitialStateType,
      action: PayloadAction<TabletType[]>,
    ) => {
      state.tables = action.payload;
    },
  },
});

export const { setTables } = tablesSlice.actions;
export default tablesSlice.reducer;

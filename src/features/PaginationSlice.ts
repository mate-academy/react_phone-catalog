import { createSlice , PayloadAction} from "@reduxjs/toolkit";

interface PaginationState {

  status: string | '4' | '8' | '16' | 'all';
  currentPage: number;

}

const initialState: PaginationState = {
  status: 'all',
  currentPage: 1,

}
export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setStatusPagin: (state,action:PayloadAction<number|'all'>) => { state.status = action.payload; },
    setCurrentPage: (state, action) => { state.currentPage = action.payload },

  }
})
export const { setStatusPagin, setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer

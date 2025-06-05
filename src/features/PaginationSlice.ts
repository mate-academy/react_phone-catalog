import { createSlice , PayloadAction} from "@reduxjs/toolkit";

interface PaginationState {

  status: 4 | 8 | 16 | 'all';
  page: number;
}

const initialState: PaginationState = {
  status: 'all',
  page: 1,
}
export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setStatus: (state,action:PayloadAction<string>) => { state.status = action.payload; },
    setPage:(state,action)=>(state.page=action.payload)
  }
})
export const { setStatus, setPage } = paginationSlice.actions;
export default paginationSlice.reducer

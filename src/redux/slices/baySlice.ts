import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BayState {
  bayList: { id: string; quantity: number }[];
}

const initialState: BayState = {
  bayList: [],
};

const baySlice = createSlice({
  name: 'bay',
  initialState,
  reducers: {
    addToBay(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.bayList.findIndex(item => item.id === id);
      if (index !== -1) {
        state.bayList[index].quantity += 1;
      } else {
        state.bayList.push({ id, quantity: 1 });
      }
    },
    removeFromBay(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.bayList.findIndex(item => item.id === id);
      if (index !== -1) {
        state.bayList.splice(index, 1);
      }
    },
    incrementQuantity(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.bayList.findIndex(item => item.id === id);
      if (index !== -1) {
        state.bayList[index].quantity += 1;
      }
    },
    decrementQuantity(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.bayList.findIndex(item => item.id === id);
      if (index !== -1) {
        if (state.bayList[index].quantity > 1) {
          state.bayList[index].quantity -= 1;
        } else {
          state.bayList.splice(index, 1);
        }
      }
    },
  },
});

export const { addToBay, removeFromBay, incrementQuantity, decrementQuantity } =
  baySlice.actions;
export default baySlice.reducer;

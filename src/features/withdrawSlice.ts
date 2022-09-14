/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Withdraw {
  [key: string]: number,
}

export interface WithdrawState {
  withdraw: Withdraw,
}
const withdrawLocalStorageKey = 'withdraw';

const getWithdrawFromLocalStorage = (): Withdraw => {
  const item = localStorage.getItem(withdrawLocalStorageKey);

  if (item) {
    return JSON.parse(item);
  }

  return {};
};

const saveWithdrawToLocalStorage = (state: Withdraw) => {
  localStorage.setItem(withdrawLocalStorageKey, JSON.stringify(state));
};

const initialState: WithdrawState = {
  withdraw: getWithdrawFromLocalStorage(),
};

export const withdrawSlice = createSlice({
  name: withdrawLocalStorageKey,
  initialState,
  reducers: {
    addWithdraw: (state, action: PayloadAction<string>) => {
      const hasProperty = Object.prototype.hasOwnProperty.call(
        getWithdrawFromLocalStorage(),
        action.payload,
      );

      if (hasProperty) {
        state.withdraw[action.payload] += 1;
      } else {
        state.withdraw[action.payload] = 1;
      }

      saveWithdrawToLocalStorage(state.withdraw);
    },
    removeWithdraw: (state, action: PayloadAction<string>) => {
      if (state.withdraw[action.payload] > 1) {
        state.withdraw[action.payload] -= 1;
      }
    },
    deleteWithdraw: (state, action: PayloadAction<string>) => {
      delete state.withdraw[action.payload];
    },
  },
});

export const {
  addWithdraw,
  removeWithdraw,
  deleteWithdraw,
} = withdrawSlice.actions;
export default withdrawSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Phone } from '../types/Phone';

interface WithdrawPhone extends Phone {
  amount: number,
}

interface Withdraw {
  [key: string]: WithdrawPhone,
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
    addWithdraw: (state, action: PayloadAction<Phone>) => {
      const hasProperty = Object.prototype.hasOwnProperty.call(
        getWithdrawFromLocalStorage(),
        action.payload.id,
      );

      if (!hasProperty) {
        state.withdraw = {
          ...state.withdraw,
          [action.payload.id]: { ...action.payload, amount: 1 },
        };
      }

      saveWithdrawToLocalStorage(state.withdraw);
    },
    encreaseAmount: (state, action: PayloadAction<[number, string]>) => {
      const hasProperty = Object.prototype.hasOwnProperty.call(
        getWithdrawFromLocalStorage(),
        action.payload[1],
      );

      if (hasProperty) {
        state.withdraw[action.payload[1]].amount += action.payload[0];
      }
    },
    decreaseAmount: (state, action: PayloadAction<[number, string]>) => {
      const hasProperty = Object.prototype.hasOwnProperty.call(
        getWithdrawFromLocalStorage(),
        action.payload[1],
      );

      if (hasProperty
        && state.withdraw[action.payload[1]].amount - action.payload[0] > 0) {
        state.withdraw[action.payload[1]].amount -= action.payload[0];
      }
    },
    deleteWithdraw: (state, action: PayloadAction<string>) => {
      delete state.withdraw[action.payload];
      saveWithdrawToLocalStorage(state.withdraw);
    },
  },
});

export const {
  addWithdraw,
  decreaseAmount,
  deleteWithdraw,
  encreaseAmount,
} = withdrawSlice.actions;
export default withdrawSlice.reducer;

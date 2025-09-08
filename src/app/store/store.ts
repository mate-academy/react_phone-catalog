import { combineSlices, configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";

import { productSlice } from "./slices/productSlice";
import { cartSlice } from "./slices/cartSlice";
import { favouritesSlice } from "./slices/favouritesSlice";
import { uiSlice } from "./slices/uiSlice";

const rootReducer = combineSlices(productSlice, cartSlice, favouritesSlice, uiSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
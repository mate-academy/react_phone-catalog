import { combineSlices, configureStore } from '@reduxjs/toolkit';

const rootReduser = combineSlices();

export const store = configureStore({
  reducer: rootReduser,
});

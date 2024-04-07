import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // your reducers will go here
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from '@reduxjs/toolkit';
import goodsSlice from './reducers/goodsSlice';
import previewsSlice from './reducers/previewsSlice';

export const store = configureStore({
  reducer: {
    goods: goodsSlice,
    previews: previewsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

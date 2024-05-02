import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../feachers/goodsPhoneSlice/productSlice';
// import detailSlice from '../feachers/detailSlice';

const store = configureStore({
  reducer: {
    phones: productSlice,
    // detail: detailSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

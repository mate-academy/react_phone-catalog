import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './slices/itemsSlice';
import favoritesSlice from './slices/favoritesSlice';

const store = configureStore({
  reducer: {
    items: itemsReducer,
    favorites: favoritesSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export { actions as favoritesActions } from './slices/favoritesSlice';
export { actions as itemsActions } from './slices/itemsSlice';

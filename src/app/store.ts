import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products';
import phonesReducer from '../features/phones';

const rootReducer = combineReducers({
  products: productsReducer,
  phones: phonesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

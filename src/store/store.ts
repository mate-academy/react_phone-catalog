import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/ProductsSlice';
import productDetailsReducer from './reducers/ProductDetailsSlice';

const rootReducer = combineReducers({
  productsReducer,
  productDetailsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

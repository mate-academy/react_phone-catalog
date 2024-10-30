import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products';
import phonesReducer from '../features/phones';
import tabletReducer from '../features/tablets';
import accessoriesReducer from '../features/accessories';
import screenWidthReducer from '../features/screenWidth';
import paginationReducer from '../features/pagination';

const rootReducer = combineReducers({
  products: productsReducer,
  phones: phonesReducer,
  tablets: tabletReducer,
  accessories: accessoriesReducer,
  screenWidth: screenWidthReducer,
  pagination: paginationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

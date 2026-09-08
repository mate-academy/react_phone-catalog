import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/products';
import phonesReducer from './reducers/phones';
import tabletReducer from './reducers/tablets';
import accessoriesReducer from './reducers/accessories';
import ProductNameReducer from './reducers/productName';
import screenWidthReducer from './reducers/screenWidth';
import paginationReducer from './reducers/pagination';
import favouritesReducer from './reducers/favourites';
import cartReducer from './reducers/cart';

const rootReducer = combineReducers({
  products: productsReducer,
  phones: phonesReducer,
  tablets: tabletReducer,
  accessories: accessoriesReducer,
  productName: ProductNameReducer,
  screenWidth: screenWidthReducer,
  pagination: paginationReducer,
  favourites: favouritesReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

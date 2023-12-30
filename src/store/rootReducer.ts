/* eslint-disable max-len */
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from '../features/cartSlice';
import favouriteReducer from '../features/favouriteSlice';
import productsReducer from '../features/productsSlice';
import selectedProductReducer from '../features/selectedProductSlice';
import queryReducer from '../features/querySlice';

const favouritePersistConfig = {
  key: 'favourite',
  storage,
  whitelist: ['favourite'],
};

const cartPersistConfig = {
  key: 'carted',
  storage,
  whitelist: ['carted'],
};

const persistedFavouriteReducer = persistReducer(favouritePersistConfig, favouriteReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const rootReducer = combineReducers({
  cartedProducts: persistedCartReducer,
  favouriteProducts: persistedFavouriteReducer,
  products: productsReducer,
  selectedProduct: selectedProductReducer,
  query: queryReducer,
});

export default rootReducer;

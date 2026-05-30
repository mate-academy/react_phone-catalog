/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import { persistStore, persistReducer } from 'redux-persist';
import productsSlice from './slices/productsSlice';
import selectedProductReducer from './slices/selectedProductSlice';
import favouriteProductReducer from './slices/favouriteProductsSlice';
import cartProductsReducer from './slices/cartProductsSlice';
const selectedProductPersistConfig = {
  key: 'selectedProduct',
  storage,
};

const persistedSelectedProductReducer = persistReducer(
  selectedProductPersistConfig,
  selectedProductReducer,
);

const store = configureStore({
  reducer: {
    product: productsSlice,
    selectedProduct: persistedSelectedProductReducer,
    favouriteProducts: favouriteProductReducer,
    cartProducts: cartProductsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;

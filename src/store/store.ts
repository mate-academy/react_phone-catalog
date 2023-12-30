// // import { configureStore } from '@reduxjs/toolkit';
// // import cartReducer from '../features/cartSlice';
// // import favouriteReducer from '../features/favouriteSlice';
// // import productsReducer from '../features/productsSlice';
// // import selectedProductReducer from '../features/selectedProductSlice';
// // import queryReducer from '../features/querySlice';

// // export const store = configureStore({
// //   reducer: {
// //     cartedProducts: cartReducer,
// //     favouriteProducts: favouriteReducer,
// //     products: productsReducer,
// //     selectedProduct: selectedProductReducer,
// //     query: queryReducer,
// //   },
// // });

// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import rootReducer from './rootReducer';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['favouritesProducts', 'cartedProducts'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });
// export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

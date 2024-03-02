import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
// import persistReducer from 'redux-persist/es/persistReducer';
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import phonesSliceReducer from "./features/phonesSlice";
import favouritesSliceReducer from "./features/favouritesSlice";
import cartSliceReducer from "./features/cartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favouritesPhones", "cartPhones"],
};

const rootReducer = combineReducers({
  phones: phonesSliceReducer,
  favouritesPhones: favouritesSliceReducer,
  cartPhones: cartSliceReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

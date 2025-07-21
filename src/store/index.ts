import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import {
  products,
  productDetails,
  phones,
  tablets,
  accessories,
  favourites,
  cart,
} from './reducers';

const rootReducer = combineReducers({
  products,
  phones,
  tablets,
  accessories,
  favourites,
  cart,
  productDetails,
});

// eslint-disable-next-line import/no-cycle
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */

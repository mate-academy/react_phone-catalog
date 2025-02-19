import {
  combineSlices,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import phonesReducer from '../features/PhonesSlice/PhonesSlice';

const rootReducer = combineSlices({
  phones: phonesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

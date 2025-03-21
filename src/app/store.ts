import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
import { menuSlice } from '../Components/features/menu';
import { carouselSlice } from '../Components/features/carousel';
import { phonesSlice } from '../Components/features/phones';
import { scrollSlice } from '../Components/features/scroll';
import { accessoriesSlice } from '../Components/features/accessories';
import { tabletsSlice } from '../Components/features/tablets';
import { catalogSlice } from '../Components/features/catalog';

const rootReducer = combineSlices(
  menuSlice,
  carouselSlice,
  phonesSlice,
  scrollSlice,
  accessoriesSlice,
  tabletsSlice,
  catalogSlice,
);

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

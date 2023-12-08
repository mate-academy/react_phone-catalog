import { ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers, createStore } from 'redux';
import favouritesSlice from '../features/favouritesSlice';
import cardSlice from '../features/cardSlice';
import { ProductPhone } from '../Type/phone';
import { saveToLocalStorage, loadFromLocalStorage } from './useLocalStorage';

// The key of this object will be the name of the store
export const rootReducers = combineReducers({
  favourites: favouritesSlice,
  card: cardSlice,
});

const store = createStore(rootReducers, loadFromLocalStorage());

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage('card', store.getState()));
store.subscribe(() => saveToLocalStorage('favourites', store.getState()));

// export const store = configureStore({
//   reducer: {
//     favourites: favouritesSlice,
//     card: cardSlice,
//   },
// });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<ProductPhone>
>;
/* eslint-enable @typescript-eslint/indent */

export default store;

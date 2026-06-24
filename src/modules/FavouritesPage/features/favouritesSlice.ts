import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { Product } from '../../../types';

export const favouritesAdapter = createEntityAdapter<Product, string>({
  selectId: product => product.itemId,
});

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: favouritesAdapter.getInitialState(),
  reducers: {
    addToFavourites: favouritesAdapter.addOne,
    removeFromFavourites: favouritesAdapter.removeOne,
    toggleFavourite: (state, action: PayloadAction<Product>) => {
      const id = action.payload.itemId;

      if (state.ids.includes(id)) {
        favouritesAdapter.removeOne(state, id);
      } else {
        favouritesAdapter.addOne(state, action.payload);
      }
    },
  },
});

export const { actions: favouritesActions, reducer: favouritesReducer } =
  favouritesSlice;

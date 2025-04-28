import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage } from '../app/localStorage';

const initialState: string[] = storage.getAllItems<string>('favourites') || [];

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const id = action.payload;
      const index = state.indexOf(id);

      if (index === -1) {
        state.push(id);
      } else {
        state.splice(index, 1);
      }

      storage.set('favourites', state);
    },
    syncFavourites: (_, action: PayloadAction<string[]>) => {
      return action.payload;
    },
  },
});

export const { toggleFavourite, syncFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;

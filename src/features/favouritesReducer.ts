import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface FavouriteState {
  items: string[];
}

const storedFavourites = localStorage.getItem('favouriteProducts');

const initialState: FavouriteState = {
  items: storedFavourites ? JSON.parse(storedFavourites) : [],
};

const saveToLocalStorage = (state: FavouriteState) => {
  localStorage.setItem('favouriteProducts', JSON.stringify(state.items));
};

const favouritesSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
      saveToLocalStorage(state);
    },
    takeProduct: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = state.items.filter(item => item !== action.payload);
      saveToLocalStorage(state);
    },
    clear: state => {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
      saveToLocalStorage(state);
    },
  },
});

export default favouritesSlice.reducer;
export const { addProduct, takeProduct, clear } = favouritesSlice.actions;

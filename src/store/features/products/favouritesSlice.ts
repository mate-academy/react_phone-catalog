import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/Product';

const loadFromLocalStorage = (): Product[] => {
  try {
    const data = localStorage.getItem('favourites');
    const parsed = data ? JSON.parse(data) : [];

    return Array.isArray(parsed)
      ? parsed.filter((item): item is Product => item && item.id)
      : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (items: Product[]) => {
  try {
    localStorage.setItem('favourites', JSON.stringify(items));
  } catch {}
};

export interface FavouritesState {
  items: Product[];
}

const initialState: FavouritesState = {
  items: loadFromLocalStorage(),
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }

      saveToLocalStorage(state.items);
    },
  },
});

export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;

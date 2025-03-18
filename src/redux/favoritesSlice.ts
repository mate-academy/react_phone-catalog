import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const FAVORITES_KEY = "favorites";

// Завантажуємо список улюблених товарів з localStorage
const loadFavoritesFromStorage = (): string[] => {
  const storedFavorites = localStorage.getItem(FAVORITES_KEY);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

// Початковий стан
const initialState: string[] = loadFavoritesFromStorage();

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      if (state.includes(itemId)) {
        return state.filter((id) => id !== itemId);
      } else {
        return [...state, itemId];
      }
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      return action.payload;
    },
  },
});

// Автоматично зберігаємо в localStorage при зміні state
export const saveFavoritesToStorage = (favorites: string[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer, { saveFavoritesToStorage } from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

// Автоматично зберігаємо зміни у localStorage
store.subscribe(() => {
  saveFavoritesToStorage(store.getState().favorites);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

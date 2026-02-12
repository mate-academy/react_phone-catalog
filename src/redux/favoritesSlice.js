/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  try {
    const storedFavorites = localStorage.getItem('favorites');

    if (storedFavorites) {
      return {
        items: JSON.parse(storedFavorites),
      };
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Помилка завантаження favorites з localStorage:', error);
  }

  return {
    items: [],
  };
};

// Функція для збереження обраних товарів в localStorage
const saveFavoritesToStorage = (favoriteItems) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favoriteItems));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Помилка збереження favorites в localStorage:', error);
  }
};

const initialState = loadFavoritesFromStorage();

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const product = action.payload;

      if (!state.items.some(item => item.id === product.id)) {
        state.items.push(product);

        // Зберігаємо оновлений список обраних товарів в localStorage
        saveFavoritesToStorage(state.items);
      }
    },

    removeFromFavorites: (state, action) => {
      const productId = action.payload;

      state.items = state.items.filter(item => item.id !== productId);

      // Зберігаємо оновлений список обраних товарів в localStorage
      saveFavoritesToStorage(state.items);
    },

    // Новий редьюсер для очищення всіх обраних товарів
    clearFavorites: (state) => {
      state.items = [];

      // Очищаємо список обраних товарів в localStorage
      saveFavoritesToStorage([]);
    },

    // Новий редьюсер для синхронізації з localStorage (на випадок, якщо дані змінюються в іншій вкладці)
    syncFavoritesWithStorage: (state) => {
      const storedFavorites = loadFavoritesFromStorage();
      state.items = storedFavorites.items;
    },
  },
});

export const currentFavoriteItems = (state) => state.favorites.items;
export const isProductInFavorites = (state, productId) =>
  state.favorites.items.some(item => item.id === productId);
export const {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  syncFavoritesWithStorage
} = favoritesSlice.actions;
export default favoritesSlice.reducer;

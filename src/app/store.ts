import { configureStore } from '@reduxjs/toolkit';
// Імпортуй свій редюсер (перевір правильність шляху до файлу)
import favoritesReducer from '../features/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    // Тут ми реєструємо наш слайс обраного
    favorites: favoritesReducer,
    // Надалі тут будуть інші редюсери, наприклад:
    // cart: cartReducer,
    // products: productsReducer,
  },
});

// Експортуємо типи, щоб використовувати їх у хуках useSelector та useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

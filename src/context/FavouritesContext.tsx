// .. FavouritesContext.tsx
/* eslint-disable */
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

// Ключ для збереження обраного в пам'яті браузера
const FAVOURITES_STORAGE_KEY = 'favourites_products';

// 1. Описуємо тип даних контексту
interface FavouritesContextType {
  favourites: string[];
  favouritesCount: number;
  toggleFavourite: (productId: string) => void;
  isFavourite: (productId: string) => boolean;
}

// 2. Створюємо контекст
const FavouritesContext = createContext<FavouritesContextType | null>(null);

// 3. Створюємо сам Провайдер
export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  // 1. ЗЧИТУВАННЯ: Завантажуємо масив рядків (string[]) з localStorage при першому запуску
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVOURITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. ЗАПИС: Зберігаємо оновлений масив у localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  // Логіка додавання / видалення (productId: string)
  const toggleFavourite = (productId: string) => {
    setFavourites(prevFavourites => {
      const isExist = prevFavourites.includes(productId);

      if (isExist) {
        // Якщо вже є — видаляємо
        return prevFavourites.filter(id => id !== productId);
      } else {
        // Якщо немає — додаємо
        return [...prevFavourites, productId];
      }
    });
  };

  // Перевірка: чи є id у масиві (productId: string)
  const isFavourite = (productId: string) => {
    return favourites.includes(productId);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        favouritesCount: favourites.length,
        toggleFavourite,
        isFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

// 4. Кастомний хук
export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }

  return context;
};

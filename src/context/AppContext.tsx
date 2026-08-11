import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';

type Theme = 'light' | 'dark';
type Language = 'ukr' | 'eng';

//Інтерфейс для теми
interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  changeLanguage: (lang: Language) => void;

  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  toggleFavorite: (product: Product) => void;
  clearCart: () => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, action: 'increment' | 'decrement') => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

//Інтерфейс для кошика
export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

//Створюємо контекст
const AppContext = createContext<AppContextType | undefined>(undefined);

// Створюємо провайдер

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //Записуємо в локал тему
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'light',
  );

  //Записуємо в локал мову
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem('lang') as Language) || 'ukr',
  );

  //Стан кошика
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  //Стан улюблених
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  //Оновлюємо
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  //Функія для зміни
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  // Функція додавання до кошика
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const isExist = prevCart.some(item => item.id === product.id);

      if (isExist) {
        return prevCart;
      }

      return [...prevCart, { id: product.id, quantity: 1, product }];
    });
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === product.id);

      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== product.id);
      }

      return [...prevFavorites, product];
    });
  };

  // Функція видалення з кошика

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Функція рахування товару
  const changeQuantity = (id: string, action: 'increment' | 'decrement') => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id !== id) {
          return item;
        }

        const newQuantity =
          action === 'increment' ? item.quantity + 1 : item.quantity - 1;

        return {
          ...item,
          quantity: newQuantity > 0 ? newQuantity : 1,
        };
      }),
    );
  };

  //Обгортаєм
  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        changeLanguage,
        cart,
        favorites,
        addToCart,
        toggleFavorite,
        removeFromCart,
        clearCart,
        changeQuantity,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//Створюэмо хук
export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
};

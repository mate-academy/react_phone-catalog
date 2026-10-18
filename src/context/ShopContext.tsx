import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Product } from '../components/ProductCard';

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

interface ShopContextType {
  cartItems: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (product: Product) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Инициализация стейтов с чтением из localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favorites, setFavorites] = useState<Product[]>(() => {
    const savedFavs = localStorage.getItem('favorites');

    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  // Синхронизация с localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Методы Корзины
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);

      if (existingItem) {
        return prev;
      } // Если уже есть, ничего не делаем

      return [...prev, { id: product.id, quantity: 1, product }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const changeQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }

    setCartItems(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => setCartItems([]);

  // Методы Избранного
  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const isExist = prev.some(item => item.id === product.id);

      if (isExist) {
        return prev.filter(item => item.id !== product.id);
      }

      return [...prev, product];
    });
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        favorites,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
        toggleFavorite,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

// Пользовательский хук для удобного импорта
export const useShopContext = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShopContext must be used within a ShopProvider');
  }

  return context;
};

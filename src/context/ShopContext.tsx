import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CartEntry } from '../types/catalog';

interface ShopContextValue {
  favorites: string[];
  cart: CartEntry[];
  favoritesCount: number;
  cartItemsCount: number;
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  addToCart: (itemId: string) => void;
  incrementCartItem: (itemId: string) => void;
  decrementCartItem: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  getCartQuantity: (itemId: string) => number;
}

const FAVORITES_KEY = 'phone-catalog:favorites';
const CART_KEY = 'phone-catalog:cart';

const ShopContext = createContext<ShopContextValue | null>(null);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartEntry[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);

      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (e) {
      // It's fine, we'll use the default empty array
    }

    try {
      const storedCart = localStorage.getItem(CART_KEY);

      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      // It's fine, we'll use the default empty array
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const toggleFavorite = (itemId: string) => {
    setFavorites(currentFavorites => {
      if (currentFavorites.includes(itemId)) {
        return currentFavorites.filter(favoriteId => favoriteId !== itemId);
      }

      return [...currentFavorites, itemId];
    });
  };

  const addToCart = (itemId: string) => {
    setCart(currentCart => {
      const isAlreadyAdded = currentCart.some(item => item.itemId === itemId);

      if (isAlreadyAdded) {
        return currentCart;
      }

      return [...currentCart, { itemId, quantity: 1 }];
    });
  };

  const incrementCartItem = (itemId: string) => {
    setCart(currentCart =>
      currentCart.map(item => {
        if (item.itemId === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      }),
    );
  };

  const decrementCartItem = (itemId: string) => {
    setCart(currentCart => {
      const targetItem = currentCart.find(item => item.itemId === itemId);

      if (!targetItem) {
        return currentCart;
      }

      if (targetItem.quantity === 1) {
        return currentCart.filter(item => item.itemId !== itemId);
      }

      return currentCart.map(item => {
        if (item.itemId === itemId) {
          return { ...item, quantity: item.quantity - 1 };
        }

        return item;
      });
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(currentCart => currentCart.filter(item => item.itemId !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isFavorite = (itemId: string) => favorites.includes(itemId);
  const isInCart = (itemId: string) =>
    cart.some(item => item.itemId === itemId);
  const getCartQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.itemId === itemId);

    return cartItem ? cartItem.quantity : 0;
  };

  const favoritesCount = favorites.length;
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        favorites,
        cart,
        favoritesCount,
        cartItemsCount,
        toggleFavorite,
        isFavorite,
        addToCart,
        incrementCartItem,
        decrementCartItem,
        removeFromCart,
        clearCart,
        isInCart,
        getCartQuantity,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }

  return context;
};

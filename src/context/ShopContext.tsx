import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type ShopContextType = {
  cartItems: string[];
  cartQuantities: Record<string, number>;
  favoriteItems: string[];
  toggleCart: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const ShopProvider = ({ children }: Props) => {
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>(
    () => {
      const savedCart = localStorage.getItem('cartQuantities');

      return savedCart ? JSON.parse(savedCart) : {};
    },
  );

  const [favoriteItems, setFavoriteItems] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('favoriteItems');

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartQuantities', JSON.stringify(cartQuantities));
  }, [cartQuantities]);

  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const cartItems = Object.keys(cartQuantities);

  const toggleCart = (productId: string) => {
    setCartQuantities(current => {
      const updated = { ...current };

      if (updated[productId]) {
        delete updated[productId];
      } else {
        updated[productId] = 1;
      }

      return updated;
    });
  };

  const toggleFavorite = (productId: string) => {
    setFavoriteItems(current =>
      current.includes(productId)
        ? current.filter(id => id !== productId)
        : [...current, productId],
    );
  };

  const increaseQuantity = (productId: string) => {
    setCartQuantities(current => {
      if (!current[productId]) {
        return current;
      }

      return {
        ...current,
        [productId]: current[productId] + 1,
      };
    });
  };

  const decreaseQuantity = (productId: string) => {
    setCartQuantities(current => {
      if (!current[productId]) {
        return current;
      }

      return {
        ...current,
        [productId]: Math.max(1, current[productId] - 1),
      };
    });
  };

  const clearCart = () => {
    setCartQuantities({});
  };

  const value: ShopContextType = {
    cartItems,
    cartQuantities,
    favoriteItems,
    toggleCart,
    toggleFavorite,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop must be used inside ShopProvider');
  }

  return context;
};

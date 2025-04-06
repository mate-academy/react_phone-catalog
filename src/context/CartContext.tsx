import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { Product } from '../types/Product';

interface CartContextProps {
  cart: Product[];
  favorites: Product[];
  quantities: { [productId: number]: number };
  totalItems: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  clearFavorites: () => void;
  isInCart: (productId: number) => boolean;
  isInFavorites: (productId: number) => boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [quantities, setQuantities] = useState<{ [productId: number]: number }>(
    () => {
      const saved = localStorage.getItem('quantities');

      return saved ? JSON.parse(saved) : {};
    },
  );

  const increaseQuantity = (productId: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (productId: number) => {
    setQuantities(prev => {
      const current = prev[productId];

      if (!current || current === 1) {
        return prev;
      }

      return {
        ...prev,
        [productId]: current - 1,
      };
    });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('quantities', JSON.stringify(quantities));
  }, [quantities]);

  const addToCart = (product: Product) => {
    const alreadyInCart = cart.find(item => item.id === product.id);

    if (!alreadyInCart) {
      setCart(prev => [...prev, product]);
    }

    increaseQuantity(product.id);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(product => product.id !== productId));

    setQuantities(prev => {
      const newQuantities = { ...prev };

      delete newQuantities[productId];

      return newQuantities;
    });
  };

  const addToFavorites = (product: Product) => {
    setFavorites(prevFavorites => [...prevFavorites, product]);
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(product => product.id !== productId),
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isInCart = (productId: number) => {
    return cart.some(product => product.id === productId);
  };

  const isInFavorites = (productId: number) => {
    return favorites.some(product => product.id === productId);
  };

  const totalItems = useMemo(() => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  }, [quantities]);

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        quantities,
        totalItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
        isInCart,
        isInFavorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type CartContextType = {
  cartItems: Record<string, number>;
  cartIds: Set<string>;
  likedIds: Set<string>;
  toggleCart: (id: string) => void;
  incrementCart: (id: string) => void;
  decrementCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  toggleLike: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = 'cartItems';
const LIKED_KEY = 'likedIds';

const loadCartFromStorage = (): Record<string, number> => {
  try {
    const raw = localStorage.getItem(CART_KEY);

    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const loadLikedFromStorage = (): Set<string> => {
  try {
    const raw = localStorage.getItem(LIKED_KEY);

    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Record<string, number>>(() =>
    loadCartFromStorage(),
  );
  const [likedIds, setLikedIds] = useState<Set<string>>(() =>
    loadLikedFromStorage(),
  );
  const clearCart = () => {
    setCartItems({});
  };

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(LIKED_KEY, JSON.stringify(Array.from(likedIds)));
  }, [likedIds]);

  const cartIds = useMemo(() => new Set(Object.keys(cartItems)), [cartItems]);

  const toggleCart = (id: string) => {
    setCartItems(prev => {
      const next = { ...prev };

      if (next[id]) {
        delete next[id];
      } else {
        next[id] = 1;
      }

      return next;
    });
  };

  const incrementCart = (id: string) => {
    setCartItems(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrementCart = (id: string) => {
    setCartItems(prev => {
      const currentQty = prev[id] || 0;

      if (currentQty <= 1) {
        const next = { ...prev };

        delete next[id];

        return next;
      }

      return { ...prev, [id]: currentQty - 1 };
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => {
      const next = { ...prev };

      delete next[id];

      return next;
    });
  };

  const toggleLike = (id: string) => {
    setLikedIds(prev => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartIds,
        likedIds,
        toggleCart,
        incrementCart,
        decrementCart,
        removeFromCart,
        toggleLike,
        clearCart,
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

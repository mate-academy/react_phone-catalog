import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export interface CartItem {
  id: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: string, productName?: string) => void;
  removeFromCart: (productId: string, productName?: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, action: 'plus' | 'minus') => void;
  notification: string | null;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart_items');
      const parsed = saved ? JSON.parse(saved) : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [notification, setNotification] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('cart_items', JSON.stringify(cartItems));
      setError(null);
    } catch {
      setError('Failed to save cart');
    }
  }, [cartItems]);

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const addToCart = (productId: string, productName?: string) => {
    if (!productId) {
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);

      let updatedItems;

      if (existingItem) {
        updatedItems = prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updatedItems = [...prevItems, { id: productId, quantity: 1 }];
      }

      const nameSnippet = productName ? `"${productName}"` : 'Product';

      setNotification(`${nameSnippet} added to cart`);

      return updatedItems;
    });
  };

  const removeFromCart = (productId: string, productName?: string) => {
    if (!productId) {
      return;
    }

    setCartItems(prevItems => {
      const nameSnippet = productName ? `"${productName}"` : 'Product';

      setNotification(`${nameSnippet} removed from cart`);

      return prevItems.filter(item => item.id !== productId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (productId: string, action: 'plus' | 'minus') => {
    if (!productId) {
      return;
    }

    setCartItems(prevItems => {
      return prevItems
        .map(item => {
          if (item.id === productId) {
            const newQuantity =
              action === 'plus' ? item.quantity + 1 : item.quantity - 1;

            return { ...item, quantity: newQuantity };
          }

          return item;
        })
        .filter(item => item.quantity > 0);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        notification,
        error,
      }}
    >
      {children}

      {notification && (
        <div className="fav-notification">
          <div className="fav-notification__content">{notification}</div>
        </div>
      )}

      {error && (
        <div className="fav-notification fav-notification--error">
          <div className="fav-notification__content">{error}</div>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    return {
      cartItems: [],
      addToCart: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      updateQuantity: () => {},
      notification: null,
      error: null,
    };
  }

  return context;
};

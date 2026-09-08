import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (err) {}
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(ci => ci.id === item.id);

      if (existing) {
        return prev.map(ci =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const increaseQty = (id: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

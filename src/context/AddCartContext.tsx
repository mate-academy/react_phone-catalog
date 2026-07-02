import { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

type AddContextType = {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void; // Теперь принимает объект
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
};

type Props = {
  children: React.ReactNode;
};

const AddCartContext = createContext<AddContextType | null>(null);

export const AddProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('cartItems');

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addToCart = (product: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev.filter(item => item.id !== product.id);
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (err) {
      // console.error('Error saving to localStorage:', err);
    }
  }, [cartItems]);

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);

      return;
    }

    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <AddCartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </AddCartContext.Provider>
  );
};

export const useAdd = () => {
  const context = useContext(AddCartContext);

  if (!context) {
    throw new Error('useAdd must be used within AddProvider');
  }

  return context;
};

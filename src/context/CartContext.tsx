import { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../types/Product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  const addToCart = (product: Product) => {
    const alreadyInCart = items.some(
      item => item.product.itemId === product.itemId,
    );

    if (alreadyInCart) {
      return;
    }

    setItems([...items, { product, quantity: 1 }]);
  };

  const removeFromCart = (id: string) => {
    setItems(items.filter(item => item.product.itemId !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }

    setItems(
      items.map(item => {
        if (item.product.itemId === id) {
          return { ...item, quantity };
        }

        return item;
      }),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}
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

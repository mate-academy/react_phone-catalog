import { createContext, useContext, useState } from 'react';
import { BaseProduct } from '../../../types/BaseProduct';

export type CartItems = BaseProduct & { quantity: number };

type CartContextType = {
  cartItems: CartItems[];
  addToCart: (product: BaseProduct) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItems[]>(() => {
    const saved = localStorage.getItem('cartItems');

    return saved ? JSON.parse(saved) : [];
  });

  const addToCart = (product: BaseProduct) => {
    const newItems = [
      ...cartItems,
      { ...product, id: String(product.itemId), quantity: 1 },
    ];

    setCartItems(newItems);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
  };

  const removeFromCart = (id: string) => {
    const itemForDelete = cartItems.filter(item => String(item.id) !== id);

    setCartItems(itemForDelete);
    localStorage.setItem('cartItems', JSON.stringify(itemForDelete));
  };

  const isInCart = (id: string) => {
    return cartItems.some(item => String(item.id) === id);
  };

  const updateQuantity = (id: string, quantity: number) => {
    const itemForUpdate = cartItems.map(item =>
      String(item.id) === id ? { ...item, quantity } : item,
    );

    setCartItems(itemForUpdate);
    localStorage.setItem('cartItems', JSON.stringify(itemForUpdate));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isInCart,
        updateQuantity,
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
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  id: string; // внутрішній id (наприклад product.id)
  itemId: string; // використовується для URL
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  uniqueId: string;
  color: string;
  capacity: string;
  colorsAvailable?: string[];
};

type Product = any;

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (uniqueId: string) => void;
  isInCart: (uniqueId: string) => boolean;
  updateQuantity: (uniqueId: string, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const uniqueId = `${product.itemId}-${product.color}-${product.capacity}`;
      const existing = prev.find(item => item.uniqueId === uniqueId);

      if (existing) {
        return prev.map(item =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      const rawPrice = product.priceDiscount ?? product.price ?? 0;
      const safePrice = Number(rawPrice);

      const newItem: CartItem = {
        id: product.id,
        itemId: product.itemId,
        name: product.name,
        price: isNaN(safePrice) ? 0 : safePrice,
        image: product.images?.[0] || product.image || '',
        category: product.category,
        quantity: 1,
        uniqueId,
        color: product.color,
        capacity: product.capacity,
        colorsAvailable: product.colorsAvailable,
      };

      return [...prev, newItem];
    });
  };


  const removeFromCart = (uniqueId: string) => {
    setCart(prev => prev.filter(item => item.uniqueId !== uniqueId));
  };

  const updateQuantity = (uniqueId: string, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.uniqueId === uniqueId) {
          const newQty = (item.quantity || 1) + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      }),
    );
  };

  const isInCart = (uniqueId: string) => {
    return cart.some(item => item.uniqueId === uniqueId);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
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
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

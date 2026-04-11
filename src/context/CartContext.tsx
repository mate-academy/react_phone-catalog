import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  id: string; // внутрішній id (наприклад product.id)
  itemId: string; // використовується для URL
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
};

type Product = any;

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  isInCart: (itemId: string) => boolean;
  updateQuantity: (itemId: string, delta: number) => void;
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
      // шукаємо товар по itemId
      const existing = prev.find(item => item.itemId === product.itemId);

      if (existing) {
        // якщо вже є — збільшуємо кількість
        return prev.map(item =>
          item.itemId === product.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      const rawPrice = product.priceDiscount ?? product.price ?? 0;
      const safePrice = Number(rawPrice);

      const newItem: CartItem = {
        id: product.id, // внутрішній id
        itemId: product.itemId, // для URL
        name: product.name,
        price: isNaN(safePrice) ? 0 : safePrice,
        image: product.images?.[0] || product.image || '',
        category: product.category,
        quantity: 1,
      };

      return [...prev, newItem];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.itemId !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.itemId === itemId) {
          const newQty = (item.quantity || 1) + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      }),
    );
  };

  const isInCart = (itemId: string) => {
    return cart.some(item => item.itemId === itemId);
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

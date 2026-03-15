import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  quantity: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);

      if (existing) {
        return prev;
      }

      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;

          return { ...item, quantity: Math.max(1, Math.min(newQty, 99)) };
        }

        return item;
      }),
    );
  };

  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart };
};

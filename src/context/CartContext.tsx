import React, { useEffect, useMemo, useState } from 'react';
import { Phone } from '../types/Phone';

type CartItem = {
  product: Phone;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  toggleToCart: (product: Phone) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: (id: string) => void;
  clearAll: () => void;
};

export const CartContext = React.createContext<CartContextType>({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  toggleToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
  clearAll: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  const { totalQuantity, totalPrice } = useMemo(() => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.product.priceDiscount * item.quantity,
      0,
    );

    return { totalQuantity, totalPrice };
  }, [items]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const toggleToCart = (product: Phone) => {
    if (items.some(item => item.product.id === product.id)) {
      setItems(currentItems =>
        currentItems.filter(item => item.product.id !== product.id),
      );
    } else {
      setItems(currentItems => {
        return [...currentItems, { product, quantity: 1 }];
      });
    }
  };

  const increaseQuantity = (id: string) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setItems(currentItems =>
      currentItems
        .map(item =>
          item.product.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const clearCart = (id: string) => {
    setItems(currentItems =>
      currentItems.filter(item => item.product.id !== id),
    );
  };

  const clearAll = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        totalPrice,
        toggleToCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        clearAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

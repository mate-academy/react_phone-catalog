import React, { useEffect, useState } from 'react';
import { CartItem } from './types/CartItem';
import { Product } from './types/Product';

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product) => void;
  deleteItem: (id: string) => void;
  clearCart: () => void;
  changeQuantity: (id: string, option: 'inc' | 'desc') => void;
};

type Props = {
  children: React.ReactNode;
};

export const CartContext = React.createContext<CartContextType | null>(null);

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addItem: product => {
          setCartItems(prev => {
            if (prev.some(item => item.id === product.itemId)) {
              return prev;
            } else {
              return [
                ...prev,
                {
                  id: product.itemId,
                  quantity: 1,
                  product: product,
                },
              ];
            }
          });
        },
        deleteItem: id => {
          setCartItems(prev => {
            return [...prev].filter(el => el.id !== id);
          });
        },
        clearCart: () => setCartItems([]),
        changeQuantity: (id, option) => {
          setCartItems(prev => {
            const prod = [...prev].find(el => el.id === id);

            if (!prod) {
              return prev;
            }

            if (option === 'inc') {
              return prev.map(item =>
                item.id === id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              );
            }

            if (option === 'desc' && prod.quantity > 1) {
              return prev.map(item =>
                item.id === id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item,
              );
            }

            return prev;
          });
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Product } from '../types/types';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string | number) => void;
  changeQuantity: (id: string | number, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('cart');

      if (!savedCart) {
        return [];
      }

      const parsed = JSON.parse(savedCart);

      return parsed.map((item: CartItem) => ({
        ...item,
        quantity: item.quantity ?? 1,
      }));
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    if (!product?.itemId) {
      return;
    }

    setCartItems(prev => {
      const id = String(product.itemId);
      const existingItem = prev.find(item => String(item.itemId) === id);

      if (existingItem) {
        return prev.map(item =>
          String(item.itemId) === id
            ? { ...item, quantity: (item.quantity ?? 1) + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string | number) => {
    const stringId = String(id);

    setCartItems(prev => prev.filter(item => String(item.itemId) !== stringId));
  };

  const changeQuantity = (id: string | number, delta: number) => {
    const stringId = String(id);

    setCartItems(prev =>
      prev.map(item => {
        if (String(item.itemId) === stringId) {
          const newQty = item.quantity + delta;

          return {
            ...item,
            quantity: newQty > 0 ? newQty : 1,
          };
        }

        return item;
      }),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        changeQuantity,
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

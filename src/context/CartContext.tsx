import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Products';
import { CartItemType } from '../types/CartItemType';

type CartContextType = {
  cart: CartItemType[];

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;

  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;

  clearCart: () => void;

  isInCart: (cartItemId: string) => boolean;
};

const CartContext = createContext<CartContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<CartItemType[]>(() => {
    const storedCart = localStorage.getItem('cart');

    if (storedCart === null) {
      return [];
    }

    return JSON.parse(storedCart);
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const alreadyExist = prev.some(
        item => item.product.itemId === product.itemId,
      );

      if (alreadyExist) {
        return prev.map(item => {
          if (item.product.itemId === product.itemId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        });
      }

      return [
        ...prev,
        {
          product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.itemId !== productId));
  };

  const increaseQuantity = (productId: string) => {
    setCart(prev =>
      prev.map(item => {
        if (item.product.itemId === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      }),
    );
  };

  const decreaseQuantity = (productId: string) => {
    const necessaryItem = cart.find(item => item.product.itemId === productId);

    if (!necessaryItem) {
      return;
    }

    if (necessaryItem.quantity === 1) {
      removeFromCart(productId);

      return;
    }

    setCart(prev =>
      prev.map(item => {
        if (item.product.itemId === productId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      }),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (productId: string) => {
    return cart.some(item => item.product.itemId === productId);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isInCart,
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

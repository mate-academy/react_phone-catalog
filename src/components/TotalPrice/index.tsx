import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CartItemType } from '../../types/CartItem';

type CartContextType = {
  cartItems: CartItemType[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  clearCart: () => void;
  totalQuantity: number;
  isInCart: (productId: string) => boolean;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increase: () => {},
  decrease: () => {},
  clearCart: () => {},
  totalQuantity: 0,
  isInCart: () => false,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItemType[]>('cart', []);

  // ✅ ИСПРАВЛЕНО: убрана логика удаления из addToCart
  const addToCart = (productId: string) => {
    if (!productId) return;

    const exists = cartItems.some(item => item.productId === productId);

    if (!exists) {
      setCartItems([...cartItems, { productId, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.productId !== productId));
  };

  const increase = (productId: string) => {
    setCartItems(
      cartItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decrease = (productId: string) => {
    setCartItems(
      cartItems
        .map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = (productId: string) =>
    cartItems.some(item => item.productId === productId);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        clearCart,
        totalQuantity,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  return useContext(CartContext);
};

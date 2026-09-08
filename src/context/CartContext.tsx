import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CartItemType } from '../types/CartItem';

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

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItemType[]>('cart', []);

  const addToCart = (productId: string) => {
    if (!productId) {
      return;
    }

    const exists = cartItems.some(item => item.productId === productId);

    if (exists) {
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } else {
      setCartItems([...cartItems, { productId, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    const cartWithoutItem = cartItems.filter(
      item => item.productId !== productId,
    );

    setCartItems(cartWithoutItem);
  };

  const increase = (productId: string) => {
    const newCart = cartItems.map(item =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );

    setCartItems(newCart);
  };

  const decrease = (productId: string) => {
    const newCart = cartItems
      .map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      )
      .filter(item => item.quantity > 0);

    setCartItems(newCart);
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

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
};

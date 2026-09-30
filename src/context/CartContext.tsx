/* eslint-disable @typescript-eslint/indent */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Product } from '../Types/types';

export interface CartItemType {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItemType[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  cartTotal: number;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<
  CartContextType | undefined
>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('Error');
  }

  return context;
};

export const CartProvider = ({
  children,
}: CartProviderProps) => {
  const [cart, setCart] = useState<CartItemType[]>(() => {
    const savedCart = localStorage.getItem('cart');

    if (savedCart === null) {
      return [];
    } else {
      return JSON.parse(savedCart);
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // #region logic
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const exist = prevCart.find(
        item => item.product.itemId === product.itemId,
      );

      if (exist) {
        return prevCart.map(item =>
          item.product.itemId === product.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const increaseQuantity = (itemId: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.itemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (itemId: string) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.product.itemId === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity >= 1),
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart =>
      prevCart.filter(
        item => item.product.itemId !== itemId,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  // #endregion

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import { Product } from '../types/Product';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  changeQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('cart');

      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const exists = prevCart.some(item => item.id === product.id);

      if (exists) {
        return prevCart;
      }

      return [...prevCart, { id: product.id, product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const changeQuantity = (productId: string, delta: number) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;

          return {
            ...item,
            quantity: newQuantity < 1 ? 1 : newQuantity,
          };
        }

        return item;
      }),
    );
  };

  const clearCart = () => setCart([]);

  const totalCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const totalPrice = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Product } from '../types/Product';

export interface CartItem {
  id: string; // Unique identifier for the cart item (product.itemId)
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  isProductInCart: (itemId: string) => boolean;
  totalItems: number;
  totalPrice: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const localCart = window.localStorage.getItem('cart');

      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      // console.error('Failed to parse cart from localStorage', error);

      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      // console.error('Failed to save cart to localStorage', error);
    }
  }, [cart]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    // console.log(`[CartContext] addToCart called for: ${product.name}`);

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.itemId);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [...prevCart, { id: product.itemId, product, quantity }];
      }
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity < 0) {
      return; // Prevent negative quantities
    }

    setCart(
      prevCart =>
        prevCart
          .map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item,
          )
          .filter(item => item.quantity > 0), // Remove item if quantity becomes 0
    );
  }, []);

  const removeFromCart = useCallback(
    (itemId: string) => {
      updateQuantity(itemId, 0); // Set quantity to 0 to remove
    },
    [updateQuantity],
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const isProductInCart = useCallback(
    (itemId: string) => cart.some(item => item.id === itemId),
    [cart],
  );

  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity, // Export the new updateQuantity function
      isProductInCart,
      totalItems,
      totalPrice,
      clearCart,
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      isProductInCart,
      totalItems,
      totalPrice,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { CatalogProducts } from '../types/Types';

export interface CartItemInterface {
  id: string | number;
  quantity: number;
  product: CatalogProducts;
}

interface CartContextType {
  cartItems: CartItemInterface[];
  addToCart: (product: CatalogProducts) => void;
  removeFromCart: (productId: CatalogProducts['id']) => void;
  updateQuantity: (productId: CatalogProducts['id'], quantity: number) => void;
  isInCart: (productId: CatalogProducts['id']) => boolean;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItemInterface[]>(() => {
    const savedcart = localStorage.getItem('cart');

    if (savedcart) {
      try {
        return JSON.parse(savedcart);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error parsing cart products:', error);

        return [];
      }
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product: CatalogProducts) => {
    setCartItems(previousCartItems => {
      const isAlreadyInCart = previousCartItems.some(
        item => item.id === product.id,
      );

      if (isAlreadyInCart) {
        return previousCartItems;
      }

      return [
        ...previousCartItems,
        { id: product.id, quantity: 1, product: product },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: CartItemInterface['id']) => {
    setCartItems(previousCartItems =>
      previousCartItems.filter(item => item.id !== productId),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: CartItemInterface['id'], newQuantity: number) => {
      if (newQuantity <= 0) {
        removeFromCart(productId);

        return;
      }

      setCartItems(previousCartItems =>
        previousCartItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    },
    [removeFromCart],
  );

  const isInCart = useCallback(
    (productId: CartItemInterface['id']) => {
      return cartItems.some(item => item.id === productId);
    },
    [cartItems],
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      isInCart,
      clearCart,
    }),
    [cartItems, addToCart, removeFromCart, updateQuantity, isInCart, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

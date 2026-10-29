import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { ProductDetailShort } from '../types/ProductDetailShort';

export interface CartItem {
  id: string;
  product: ProductDetailShort;
  quantity: number;
}

interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: ProductDetailShort) => void;
  removeFromCart: (productId: string) => void;
  changeQuantity: (productId: string, delta: number) => void;
  isInCart: (productId: string) => boolean;
  toggleCart: (product: ProductDetailShort) => void;
  totalCount: number;
  totalPrice: number;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = 'cart';

function isProduct(value: unknown): value is ProductDetailShort {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const product = value as Record<string, unknown>;

  return (
    typeof product.id === 'number' &&
    typeof product.category === 'string' &&
    typeof product.itemId === 'string' &&
    typeof product.name === 'string' &&
    typeof product.fullPrice === 'number' &&
    typeof product.price === 'number' &&
    typeof product.screen === 'string' &&
    typeof product.capacity === 'string' &&
    typeof product.color === 'string' &&
    typeof product.ram === 'string' &&
    typeof product.year === 'number' &&
    typeof product.image === 'string'
  );
}

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === 'string' &&
    isProduct(item.product) &&
    item.id === item.product.itemId &&
    typeof item.quantity === 'number' &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

function readCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const savedCart = window.localStorage.getItem(STORAGE_KEY);

    if (savedCart === null) {
      return [];
    }

    const parsed: unknown = JSON.parse(savedCart);

    if (Array.isArray(parsed) && parsed.every(isCartItem)) {
      return parsed;
    }
  } catch (error) {}

  return [];
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>(readCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {}
  }, [cart]);

  const addToCart = (product: ProductDetailShort) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.itemId);

      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { id: product.itemId, product, quantity: 1 }];
    });
  };

  const toggleCart = (product: ProductDetailShort) => {
    setCart(currentCart => {
      const isAlreadyInCart = currentCart.some(
        item => item.id === product.itemId,
      );

      if (isAlreadyInCart) {
        return currentCart.filter(item => item.id !== product.itemId);
      }

      return [...currentCart, { id: product.itemId, product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const changeQuantity = (productId: string, delta: number) => {
    setCart(currentCart =>
      currentCart.flatMap(item => {
        if (item.id !== productId) {
          return [item];
        }

        const quantity = item.quantity + delta;

        return quantity > 0 ? [{ ...item, quantity }] : [];
      }),
    );
  };

  const isInCart = (productId: string) =>
    cart.some(item => item.id === productId);

  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        isInCart,
        toggleCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider.');
  }

  return context;
};

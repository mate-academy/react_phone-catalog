import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { useEffect, useState } from 'react';
import { Product } from '../types/Product';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data) as T;
    } catch {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const valueToStore =
        newValue instanceof Function ? newValue(prev) : newValue;

      localStorage.setItem(key, JSON.stringify(valueToStore));

      return valueToStore;
    });
  };

  return [value, save];
}

export function useCart() {
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const isInCart = prevCart.some(p => p.itemId === product.itemId);

      if (isInCart) {
        return prevCart;
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(p => p.itemId !== itemId));
  };

  const toggleCartItem = (product: Product) => {
    setCart(prevCart => {
      const isInCart = prevCart.some(p => p.itemId === product.itemId);
      const updatedCart = isInCart
        ? prevCart.filter(p => p.itemId !== product.itemId)
        : [...prevCart, { ...product, quantity: 1 }];

      console.log('cart after toggle:', updatedCart);

      return updatedCart;
    });
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, p) => acc + p.quantity, 0);
  const totalPrice = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    toggleCartItem,
    clearCart,
    totalItems,
    totalPrice,
  };
}

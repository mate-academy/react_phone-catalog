import { createContext, useContext, useEffect, useState } from 'react';
import type { CartItem, Product } from '../types';
type Store = {
  cart: CartItem[];
  favorites: string[];
  addCart: (p: Product) => void;
  changeQty: (id: string, n: number) => void;
  removeCart: (id: string) => void;
  toggleFavorite: (id: string) => void;
  clearCart: () => void;
};
const Context = createContext<Store | null>(null);
const read = <T,>(key: string, fallback: T): T => {
  try {
    return JSON.parse(localStorage.getItem(key) || '') as T;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => read('catalog-cart', []));
  const [favorites, setFavorites] = useState<string[]>(() =>
    read('catalog-favorites', []),
  );

  useEffect(
    () => localStorage.setItem('catalog-cart', JSON.stringify(cart)),
    [cart],
  );
  useEffect(
    () => localStorage.setItem('catalog-favorites', JSON.stringify(favorites)),
    [favorites],
  );

  return (
    <Context.Provider
      value={{
        cart,
        favorites,
        addCart: p =>
          setCart(x =>
            x.some(i => i.product.id === p.id)
              ? x
              : [...x, { product: p, quantity: 1 }],
          ),
        changeQty: (id, n) =>
          setCart(x =>
            x.map(i =>
              i.product.id === id ? { ...i, quantity: Math.max(1, n) } : i,
            ),
          ),
        removeCart: id => setCart(x => x.filter(i => i.product.id !== id)),
        toggleFavorite: id =>
          setFavorites(x =>
            x.includes(id) ? x.filter(v => v !== id) : [...x, id],
          ),
        clearCart: () => setCart([]),
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useStore = () => {
  const v = useContext(Context);

  if (!v) {
    throw Error('StoreProvider missing');
  }

  return v;
};

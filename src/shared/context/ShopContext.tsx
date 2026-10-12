import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem, Product } from '../types';

interface ShopContextValue {
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  toggleFavorite: (product: Product) => void;
  toggleCart: (product: Product) => void;
  isFavorite: (id: string) => boolean;
  isInCart: (id: string) => boolean;
}

const ShopContext = createContext<ShopContextValue | null>(null);

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);

    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage('nice-gadgets-cart', []),
  );
  const [favorites, setFavorites] = useState<Product[]>(() =>
    readStorage('nice-gadgets-favorites', []),
  );

  useEffect(() => {
    localStorage.setItem('nice-gadgets-cart', JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem('nice-gadgets-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo<ShopContextValue>(
    () => ({
      cart,
      favorites,
      addToCart: product =>
        setCart(items =>
          items.some(item => item.id === product.id)
            ? items
            : [...items, { id: product.id, quantity: 1, product }],
        ),
      removeFromCart: id =>
        setCart(items => items.filter(item => item.id !== id)),
      changeQuantity: (id, delta) =>
        setCart(items =>
          items.map(item =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item,
          ),
        ),
      clearCart: () => setCart([]),
      toggleFavorite: product =>
        setFavorites(items =>
          items.some(item => item.id === product.id)
            ? items.filter(item => item.id !== product.id)
            : [...items, product],
        ),
      toggleCart: product =>
        setCart(items =>
          items.some(item => item.id === product.id)
            ? items.filter(item => item.id !== product.id)
            : [...items, { id: product.id, quantity: 1, product }],
        ),
      isFavorite: id => favorites.some(item => item.id === id),
      isInCart: id => cart.some(item => item.id === id),
    }),
    [cart, favorites],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const value = useContext(ShopContext);

  if (!value) {
    throw new Error('useShop must be used inside ShopProvider');
  }

  return value;
}

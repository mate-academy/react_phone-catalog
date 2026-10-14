import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CartItem, Product } from '../types/Product';

interface ShopState {
  cart: CartItem[];
  favorites: Product[];
  cartQuantity: number;
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  changeQuantity: (itemId: string, change: number) => void;
  clearCart: () => void;
  toggleFavorite: (product: Product) => void;
}

const ShopContext = createContext<ShopState | null>(null);

function normalizeStoredProduct(value: unknown): Product | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const { id: legacyOrder, ...product } = value as Partial<Product> & {
    id?: unknown;
  };

  if (
    typeof product.itemId !== 'string' ||
    typeof product.name !== 'string' ||
    typeof product.image !== 'string' ||
    typeof product.price !== 'number' ||
    !Number.isFinite(product.price) ||
    product.price < 0
  ) {
    return null;
  }

  const sortOrder =
    typeof product.sortOrder === 'number' && Number.isFinite(product.sortOrder)
      ? product.sortOrder
      : typeof legacyOrder === 'number' && Number.isFinite(legacyOrder)
        ? legacyOrder
        : 0;

  return { ...product, sortOrder } as Product;
}

function readStorage(key: string): unknown[] {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');

    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep the current session usable when browser storage is unavailable.
  }
}

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage('nice-gadgets-cart').flatMap(value => {
      if (!value || typeof value !== 'object') {
        return [];
      }

      const item = value as Partial<CartItem>;
      const product = normalizeStoredProduct(item.product);

      if (
        !product ||
        item.id !== product.itemId ||
        !Number.isInteger(item.quantity) ||
        typeof item.quantity !== 'number' ||
        item.quantity <= 0
      ) {
        return [];
      }

      return [{ id: product.itemId, quantity: item.quantity, product }];
    }),
  );
  const [favorites, setFavorites] = useState<Product[]>(() =>
    readStorage('nice-gadgets-favorites')
      .map(normalizeStoredProduct)
      .filter((product): product is Product => product !== null),
  );

  useEffect(() => saveStorage('nice-gadgets-cart', cart), [cart]);
  useEffect(
    () => saveStorage('nice-gadgets-favorites', favorites),
    [favorites],
  );

  const addToCart = useCallback((product: Product) => {
    setCart(items =>
      items.some(item => item.product.itemId === product.itemId)
        ? items
        : [...items, { id: product.itemId, quantity: 1, product }],
    );
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(items => items.filter(item => item.product.itemId !== itemId));
  }, []);

  const changeQuantity = useCallback((itemId: string, change: number) => {
    setCart(items =>
      items.map(item =>
        item.product.itemId === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(items =>
      items.some(item => item.itemId === product.itemId)
        ? items.filter(item => item.itemId !== product.itemId)
        : [...items, product],
    );
  }, []);

  const cartQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );
  const value = useMemo(
    () => ({
      cart,
      favorites,
      cartQuantity,
      addToCart,
      removeFromCart,
      changeQuantity,
      clearCart,
      toggleFavorite,
    }),
    [
      cart,
      favorites,
      cartQuantity,
      addToCart,
      removeFromCart,
      changeQuantity,
      clearCart,
      toggleFavorite,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop must be used inside ShopProvider');
  }

  return context;
};

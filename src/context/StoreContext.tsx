import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getProducts } from '../api/products';
import { Product } from '../types/Product';

type Cart = Record<number, number>;

type StoreContextValue = {
  products: Product[];
  isLoading: boolean;
  error: string;
  cart: Cart;
  favorites: number[];
  cartCount: number;
  cartTotal: number;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  changeQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: number) => void;
  reloadProducts: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const savedValue = localStorage.getItem(key);

    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch {
    return fallback;
  }
};

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestKey, setRequestKey] = useState(0);

  const [cart, setCart] = useState<Cart>(() => readStorage('cart', {}));

  const [favorites, setFavorites] = useState<number[]>(() =>
    readStorage('favorites', []),
  );

  useEffect(() => {
    setIsLoading(true);
    setError('');

    getProducts()
      .then(setProducts)
      .catch(() => {
        setError('Something went wrong while loading products.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [requestKey]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  const cartTotal = products.reduce(
    (total, product) => total + product.price * (cart[product.id] || 0),
    0,
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      products,
      isLoading,
      error,
      cart,
      favorites,
      cartCount,
      cartTotal,

      addToCart: productId => {
        setCart(currentCart =>
          currentCart[productId]
            ? currentCart
            : { ...currentCart, [productId]: 1 },
        );
      },

      removeFromCart: productId => {
        setCart(currentCart => {
          const nextCart = { ...currentCart };

          delete nextCart[productId];

          return nextCart;
        });
      },

      changeQuantity: (productId, delta) => {
        setCart(currentCart => ({
          ...currentCart,
          [productId]: Math.max(1, (currentCart[productId] || 1) + delta),
        }));
      },

      clearCart: () => {
        setCart({});
      },

      toggleFavorite: productId => {
        setFavorites(currentFavorites =>
          currentFavorites.includes(productId)
            ? currentFavorites.filter(id => id !== productId)
            : [...currentFavorites, productId],
        );
      },

      reloadProducts: () => {
        setRequestKey(currentKey => currentKey + 1);
      },
    }),
    [cart, cartCount, cartTotal, error, favorites, isLoading, products],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('useStore must be used inside StoreProvider');
  }

  return store;
};

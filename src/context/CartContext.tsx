import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getProducts } from '../api/products';
import { Product } from '../types/Product';

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

interface LegacyCartItem {
  itemId: string;
  quantity: number;
}

interface StoredCartState {
  items: CartItem[];
  legacyItems: LegacyCartItem[];
}

interface CartContextValue {
  cartItems: CartItem[];
  cartCount: number;
  isCartLoading: boolean;
  hasCartError: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  changeQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  reloadCart: () => void;
}

interface Props {
  children: ReactNode;
}

const STORAGE_KEY = 'cartItems';
const CartContext = createContext<CartContextValue | undefined>(undefined);

const isPositiveQuantity = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value > 0;

const isProduct = (value: unknown): value is Product => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return (
    'id' in value &&
    typeof value.id === 'number' &&
    'category' in value &&
    (value.category === 'phones' ||
      value.category === 'tablets' ||
      value.category === 'accessories') &&
    'itemId' in value &&
    typeof value.itemId === 'string' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'fullPrice' in value &&
    typeof value.fullPrice === 'number' &&
    'price' in value &&
    typeof value.price === 'number' &&
    'screen' in value &&
    typeof value.screen === 'string' &&
    'capacity' in value &&
    typeof value.capacity === 'string' &&
    'color' in value &&
    typeof value.color === 'string' &&
    'ram' in value &&
    typeof value.ram === 'string' &&
    'year' in value &&
    typeof value.year === 'number' &&
    'image' in value &&
    typeof value.image === 'string'
  );
};

const mergeQuantities = <T extends { quantity: number }>(
  items: T[],
  getId: (item: T) => string,
) => {
  const result = new Map<string, T>();

  items.forEach(item => {
    const id = getId(item);
    const existingItem = result.get(id);

    result.set(
      id,
      existingItem
        ? { ...item, quantity: existingItem.quantity + item.quantity }
        : item,
    );
  });

  return Array.from(result.values());
};

const getStoredCartState = (): StoredCartState => {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : [];

    if (!Array.isArray(parsedValue)) {
      return { items: [], legacyItems: [] };
    }

    const items: CartItem[] = [];
    const legacyItems: LegacyCartItem[] = [];

    parsedValue.forEach(item => {
      if (
        typeof item !== 'object' ||
        item === null ||
        !('quantity' in item) ||
        !isPositiveQuantity(item.quantity)
      ) {
        return;
      }

      if ('product' in item && isProduct(item.product)) {
        const id = item.product.itemId;

        items.push({ id, quantity: item.quantity, product: item.product });

        return;
      }

      if ('itemId' in item && typeof item.itemId === 'string') {
        legacyItems.push({ itemId: item.itemId, quantity: item.quantity });
      }
    });

    return {
      items: mergeQuantities(items, item => item.id),
      legacyItems: mergeQuantities(legacyItems, item => item.itemId),
    };
  } catch {
    return { items: [], legacyItems: [] };
  }
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [storedCart] = useState(getStoredCartState);
  const [cartItems, setCartItems] = useState<CartItem[]>(storedCart.items);
  const [legacyItems, setLegacyItems] = useState<LegacyCartItem[]>(
    storedCart.legacyItems,
  );
  const [isCartLoading, setIsCartLoading] = useState(
    storedCart.legacyItems.length > 0,
  );
  const [hasCartError, setHasCartError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (legacyItems.length === 0) {
      setIsCartLoading(false);
      setHasCartError(false);

      return undefined;
    }

    let isCancelled = false;

    setIsCartLoading(true);
    setHasCartError(false);

    getProducts()
      .then(products => {
        if (isCancelled) {
          return;
        }

        const productsById = new Map(
          products.map(product => [product.itemId, product]),
        );
        const migratedItems = legacyItems.flatMap(item => {
          const product = productsById.get(item.itemId);

          return product
            ? [{ id: item.itemId, quantity: item.quantity, product }]
            : [];
        });

        setCartItems(currentItems => {
          const currentIds = new Set(currentItems.map(item => item.id));

          return [
            ...currentItems,
            ...migratedItems.filter(item => !currentIds.has(item.id)),
          ];
        });
        setLegacyItems([]);
      })
      .catch(() => {
        if (!isCancelled) {
          setHasCartError(true);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsCartLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [legacyItems, reloadKey]);

  useEffect(() => {
    if (legacyItems.length === 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
      } catch {
        // The cart remains usable even if persistent storage is unavailable.
      }
    }
  }, [cartItems, legacyItems.length]);

  const addToCart = useCallback(
    (product: Product) => {
      if (legacyItems.some(item => item.itemId === product.itemId)) {
        return;
      }

      setCartItems(currentItems => {
        if (currentItems.some(item => item.id === product.itemId)) {
          return currentItems;
        }

        return [...currentItems, { id: product.itemId, quantity: 1, product }];
      });
    },
    [legacyItems],
  );

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems(currentItems =>
      currentItems.filter(item => item.id !== itemId),
    );
    setLegacyItems(currentItems =>
      currentItems.filter(item => item.itemId !== itemId),
    );
  }, []);

  const changeQuantity = useCallback((itemId: string, quantity: number) => {
    if (!isPositiveQuantity(quantity)) {
      return;
    }

    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item,
      ),
    );
    setLegacyItems(currentItems =>
      currentItems.map(item =>
        item.itemId === itemId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setLegacyItems([]);
    setHasCartError(false);
  }, []);

  const isInCart = useCallback(
    (itemId: string) =>
      cartItems.some(item => item.id === itemId) ||
      legacyItems.some(item => item.itemId === itemId),
    [cartItems, legacyItems],
  );

  const cartCount = useMemo(
    () =>
      [...cartItems, ...legacyItems].reduce(
        (total, item) => total + item.quantity,
        0,
      ),
    [cartItems, legacyItems],
  );

  const reloadCart = useCallback(() => {
    setReloadKey(key => key + 1);
  }, []);

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      isCartLoading,
      hasCartError,
      addToCart,
      removeFromCart,
      changeQuantity,
      clearCart,
      isInCart,
      reloadCart,
    }),
    [
      addToCart,
      cartCount,
      cartItems,
      changeQuantity,
      clearCart,
      hasCartError,
      isCartLoading,
      isInCart,
      reloadCart,
      removeFromCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
};

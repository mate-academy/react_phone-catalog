import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Product } from '../../types/Product';

type CartItem = {
  product: Product;
  quantity: number;
};

type ShopContextType = {
  cart: CartItem[];
  favorites: Product[];

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;

  toggleFavorite: (product: Product) => void;

  isInCart: (productId: string) => boolean;
  isFavorite: (productId: string) => boolean;
};

type Props = {
  children: ReactNode;
};

const ShopContext = createContext<ShopContextType | null>(null);

const getStoredCart = (): CartItem[] => {
  const savedCart = localStorage.getItem('cart');

  if (!savedCart) {
    return [];
  }

  try {
    const parsedCart: unknown = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart
      .map(item => {
        if (
          typeof item === 'object' &&
          item !== null &&
          'product' in item &&
          'quantity' in item
        ) {
          const cartItem = item as CartItem;

          if (cartItem.product && typeof cartItem.product.itemId === 'string') {
            return {
              product: cartItem.product,
              quantity:
                typeof cartItem.quantity === 'number'
                  ? Math.max(1, cartItem.quantity)
                  : 1,
            };
          }
        }

        if (typeof item === 'object' && item !== null && 'itemId' in item) {
          return {
            product: item as Product,
            quantity: 1,
          };
        }

        return null;
      })
      .filter((item): item is CartItem => item !== null);
  } catch {
    return [];
  }
};

const getStoredFavorites = (): Product[] => {
  const savedFavorites = localStorage.getItem('favorites');

  if (!savedFavorites) {
    return [];
  }

  try {
    const parsedFavorites: unknown = JSON.parse(savedFavorites);

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return parsedFavorites.filter(
      (item): item is Product =>
        typeof item === 'object' &&
        item !== null &&
        'itemId' in item &&
        typeof item.itemId === 'string',
    );
  } catch {
    return [];
  }
};

export const ShopProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItem[]>(getStoredCart);
  const [favorites, setFavorites] = useState<Product[]>(getStoredFavorites);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = useCallback((product: Product) => {
    setCart(currentCart => {
      const exists = currentCart.some(
        item => item.product.itemId === product.itemId,
      );

      if (exists) {
        return currentCart;
      }

      return [
        ...currentCart,
        {
          product,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(currentCart => {
      return currentCart.filter(item => item.product.itemId !== productId);
    });
  }, []);

  const increaseQuantity = useCallback((productId: string) => {
    setCart(currentCart => {
      return currentCart.map(item => {
        if (item.product.itemId !== productId) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });
    });
  }, []);

  const decreaseQuantity = useCallback((productId: string) => {
    setCart(currentCart => {
      return currentCart.map(item => {
        if (item.product.itemId !== productId) {
          return item;
        }

        return {
          ...item,
          quantity: Math.max(1, item.quantity - 1),
        };
      });
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(currentFavorites => {
      const exists = currentFavorites.some(
        item => item.itemId === product.itemId,
      );

      if (exists) {
        return currentFavorites.filter(item => item.itemId !== product.itemId);
      }

      return [...currentFavorites, product];
    });
  }, []);

  const isInCart = useCallback(
    (productId: string) => {
      return cart.some(item => item.product.itemId === productId);
    },
    [cart],
  );

  const isFavorite = useCallback(
    (productId: string) => {
      return favorites.some(item => item.itemId === productId);
    },
    [favorites],
  );

  const value = useMemo(
    () => ({
      cart,
      favorites,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      toggleFavorite,
      isInCart,
      isFavorite,
    }),
    [
      cart,
      favorites,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      toggleFavorite,
      isInCart,
      isFavorite,
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

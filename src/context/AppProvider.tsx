import React, {
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { BaseProduct } from '@/types/Product';
import { CartItem } from '@/types/Cart';
import { AppContext } from './AppContext';
import { notify } from '@utils/notifications';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const getItemUniqueId = useCallback(
    (product: BaseProduct) =>
      String('itemId' in product ? product.itemId : product.id),
    [],
  );

  const addToCart = useCallback(
    (product: BaseProduct) => {
      const normalizedProduct = {
        ...product,
        priceDiscount: product.priceDiscount ?? product.price ?? 0,
        priceRegular: product.priceRegular ?? product.fullPrice ?? 0,
      };

      const itemUniqueId = getItemUniqueId(normalizedProduct);

      setCartItems((prev) => {
        const existing = prev.find(
          (item) => item.itemUniqueId === itemUniqueId,
        );

        if (existing) {
          return prev.map((item) =>
            item.itemUniqueId === itemUniqueId ?
              { ...item, quantity: item.quantity + 1 }
            : item,
          );
        }

        return [...prev, { ...normalizedProduct, quantity: 1, itemUniqueId }];
      });
    },
    [getItemUniqueId],
  );

  const removeFromCart = useCallback((itemUniqueId: string) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.itemUniqueId === itemUniqueId);
      if (item) notify.removedFromCart(item.name);
      return prev.filter((i) => i.itemUniqueId !== itemUniqueId);
    });
  }, []);

  const updateQuantity = useCallback(
    (itemUniqueId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(itemUniqueId);
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.itemUniqueId === itemUniqueId ? { ...item, quantity } : item,
        ),
      );
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const isInCart = useCallback(
    (product: BaseProduct) => {
      const id = getItemUniqueId(product);
      return cartItems.some((item) => item.itemUniqueId === id);
    },
    [cartItems, getItemUniqueId],
  );

  const toggleCart = useCallback(
    (product: BaseProduct) => {
      const id = getItemUniqueId(product);
      if (cartItems.some((item) => item.itemUniqueId === id)) {
        removeFromCart(id);
      } else {
        addToCart(product);
        notify.addedToCart(product.name);
      }
    },
    [cartItems, getItemUniqueId, addToCart, removeFromCart],
  );

  const toggleFavorite = useCallback(
    (product: BaseProduct) => {
      const id = getItemUniqueId(product);

      setFavorites((prev) => {
        const exists = prev.includes(id);

        if (exists) {
          notify.removedFromFavorites(product.name);
          return prev.filter((fav) => fav !== id);
        }

        notify.addedToFavorites(product.name);
        return [...prev, id];
      });
    },
    [getItemUniqueId],
  );

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(String(productId)),
    [favorites],
  );

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + (item.priceDiscount ?? item.price) * item.quantity,
        0,
      ),
    [cartItems],
  );

  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const favoritesCount = useMemo(() => favorites.length, [favorites]);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      toggleCart,
      updateQuantity,
      clearCart,
      totalPrice,
      totalItems,
      isInCart,
      favorites,
      toggleFavorite,
      isFavorite,
      favoritesCount,
    }),
    [
      cartItems,
      favorites,
      totalPrice,
      totalItems,
      favoritesCount,
      addToCart,
      removeFromCart,
      toggleCart,
      updateQuantity,
      clearCart,
      isInCart,
      toggleFavorite,
      isFavorite,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

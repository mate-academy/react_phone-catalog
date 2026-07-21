import { FC, ReactNode, useEffect, useState } from 'react';
import { CartItem } from '../../modules/shared/types/CartItem';
import { Product } from '../../modules/shared/types/Product';
import { ShopContext } from './ShopContext';

type Props = {
  children: ReactNode;
};

const readStoredArray = <T,>(key: string): T[] => {
  try {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    localStorage.removeItem(key);

    return [];
  }
};

export const ShopProvider: FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    return readStoredArray<CartItem>('cartItems');
  });

  const [favorites, setFavorites] = useState<Product[]>(() => {
    return readStoredArray<Product>('favorites');
  });

  const addToCart = (product: Product) => {
    setCartItems(currentItems => {
      const isAlreadyAdded = currentItems.some(
        item => item.product.id === product.id,
      );

      if (isAlreadyAdded) {
        return currentItems;
      }

      return [...currentItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(items => items.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseQuantity = (productId: number) => {
    setCartItems(currentItems =>
      currentItems.map(item => {
        return item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      }),
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems(currentItems =>
      currentItems.map(item => {
        return item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      }),
    );
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(currentFavorites => {
      const isAlreadyFavorite = currentFavorites.some(
        item => item.id === product.id,
      );

      if (isAlreadyFavorite) {
        return currentFavorites.filter(item => item.id !== product.id);
      }

      return [...currentFavorites, product];
    });
  };

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.product.id === productId);
  };

  const isFavorite = (productId: number) => {
    return favorites.some(item => item.id === productId);
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        favorites,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        toggleFavorite,
        isInCart,
        isFavorite,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

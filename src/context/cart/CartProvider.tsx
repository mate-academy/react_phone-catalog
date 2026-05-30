import { ReactNode, useEffect, useMemo, useState } from 'react';
import { CartContext, CartItem } from './CartContext';
import { useProducts } from '../products/useProducts';

type SavedItem = { itemId: string; quantity: number };

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { products, getProductById } = useProducts();

  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
      return [];
    }
  });

  const cartItems = useMemo<CartItem[]>(() => {
    if (!products.length) {
      return [];
    }

    return savedItems
      .map(({ itemId, quantity }) => {
        const product = getProductById(itemId);

        return product ? { product, quantity } : null;
      })
      .filter((x): x is CartItem => x !== null);
  }, [savedItems, products, getProductById]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(savedItems));
  }, [savedItems]);

  const addToCart = (productId: string) => {
    setSavedItems(prev => {
      const existing = prev.find(item => item.itemId === productId);

      if (existing) {
        return prev.map(item =>
          item.itemId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { itemId: productId, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setSavedItems(prev =>
      prev
        .map(item => (item.itemId === id ? { ...item, quantity } : item))
        .filter(item => item.quantity > 0),
    );
  };

  const removeFromCart = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.itemId !== id));
  };

  const clearCart = () => setSavedItems([]);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const totalCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems],
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalCount,
      totalPrice,
    }),
    [cartItems, totalCount, totalPrice],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

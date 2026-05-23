// src/features/cart/hooks/useCartProducts.ts
import { useState, useEffect, useMemo } from 'react';
import { useCart } from '@/app/providers/CartContext';
import { getProducts } from '@/shared/api/api';
import { Product } from '@/types';

// Об'єднаний тип (можна також винести у types.ts)
export type CartProduct = Product & { quantity: number };

export const useCartProducts = () => {
  const { cart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cart.length === 0) {
      setIsLoading(false);
      return;
    }

    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, [cart.length]);

  const cartProducts = useMemo(() => {
    return cart
      .map(cartItem => {
        const product = products.find(p => p.itemId === cartItem.itemId);
        return product ? { ...product, quantity: cartItem.quantity } : null;
      })
      .filter((item): item is CartProduct => item !== null);
  }, [cart, products]);

  const totalAmount = useMemo(
    () =>
      cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartProducts],
  );

  return {
    cartProducts,
    totalAmount,
    isLoading,
    isEmpty: cart.length === 0,
  };
};

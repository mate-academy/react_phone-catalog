import { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/ProductTypes';

export const useCart = () => {
  const [cart, setCart] = useState<ProductDetails[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductDetails) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);

      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);

      localStorage.setItem('cart', JSON.stringify(newCart));

      return newCart;
    });
  };

  return { cart, addToCart, removeFromCart };
};

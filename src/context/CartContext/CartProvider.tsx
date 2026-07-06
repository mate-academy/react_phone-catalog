import React, { useEffect, useState } from 'react';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { CartItemProduct } from '../../types/CartItemProduct';
import { CartContext } from './CartContext';

function mapToCartItemProduct(
  product: Product | ProductDetails,
): CartItemProduct {
  if ('itemId' in product) {
    return {
      id: product.itemId,
      image: product.image,
      title: product.name,
      finalPrice: product.price,
    };
  }

  return {
    id: product.namespaceId,
    image: product.images[0],
    title: product.name,
    finalPrice: product.priceDiscount,
  };
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cartItems');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product | ProductDetails) => {
    const cartItem = mapToCartItemProduct(product);

    setCartItems(prev => {
      const isCartItem = prev.find(item => item.id === cartItem.id);

      if (isCartItem) {
        return prev;
      }

      return [...prev, { id: cartItem.id, quantity: 1, product: cartItem }];
    });
  };

  const increaseQuantity = (id: string) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      }),
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          return item.quantity === 1
            ? item
            : { ...item, quantity: item.quantity - 1 };
        }

        return item;
      }),
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

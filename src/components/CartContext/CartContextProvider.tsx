import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { CartItemType } from '../../types/CartItemType';
import { CartType } from '../../types/CartType';

export const CartContext = React.createContext<CartType>({
  cart: [],
  handleCart: () => { },
  handleProductQuantity: () => { },
});

type Props = {
  children: React.ReactNode,
};

export const CartContextProvider: React.FC<Props> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItemType[]>([]);

  const localCart = localStorage.getItem('cart');

  useEffect(() => {
    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  }, []);

  const handleCart = (product: Product) => {
    const { id } = product;

    if (cart.some(item => item.id === id)) {
      setCart(prev => prev.filter(item => item.id !== id));
      localStorage.setItem('cart', JSON.stringify(
        cart.filter(item => item.id !== id),
      ));
    } else {
      const cartItem = {
        id,
        product,
        quantity: 1,
      };

      setCart(prev => [...prev, cartItem]);
      localStorage.setItem('cart', JSON.stringify([
        ...cart, cartItem,
      ]));
    }
  };

  const handleProductQuantity = (
    productId: string,
    quantity: number,
    action = 'increase',
  ) => {
    setCart(prev => prev.map(product => {
      switch (action) {
        case 'increase':
          if (productId === product.id) {
            return {
              ...product,
              quantity: quantity + 1,
            };
          }

          return product;

        case 'decrease':
          if (productId === product.id) {
            return {
              ...product,
              quantity: quantity - 1,
            };
          }

          return product;

        default:
          return product;
      }
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleCart,
        handleProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

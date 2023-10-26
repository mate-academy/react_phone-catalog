import React, { useEffect, useMemo, useState } from 'react';

export const CartContext = React.createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  increase: () => {},
  decrease: () => {},
  totalAmount: 0,
  totalQuantity: 0,
});

export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<InitialProduct[]>(
    JSON.parse(localStorage.getItem('cart') || '[]'),
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const selectedProduct = {
      ...product,
      quantityInCart: 1,
    };

    setCart([...cart, selectedProduct]);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(cart.filter(cartItem => cartItem.id !== cartItemId));
  };

  const increase = (cartItemId: string) => {
    const updateCart = cart.map((cartItem) => {
      if (cartItem.id !== cartItemId) {
        return cartItem;
      }

      return {
        ...cartItem,
        quantityInCart: cartItem.quantityInCart + 1,
      };
    });

    setCart(updateCart);
  };

  const decrease = (cartItemId: string) => {
    const updateCart = cart.map((cartItem) => {
      if (cartItem.id !== cartItemId) {
        return cartItem;
      }

      return {
        ...cartItem,
        quantityInCart: cartItem.quantityInCart - 1,
      };
    });

    setCart(updateCart);
  };

  const totalAmount = useMemo(() => {
    return cart.reduce((total, currentItem) => {
      const { discount, price, quantityInCart } = currentItem;
      const totalCurrentItem = discount > 0
        ? Math.round(price - (price * (discount / 100))) * quantityInCart
        : price * quantityInCart;

      return total + totalCurrentItem;
    }, 0);
  }, [cart]);

  const totalQuantity = useMemo(() => {
    return cart.reduce(
      (total, currentItem) => total + currentItem.quantityInCart, 0,
    );
  }, [cart]);

  const contextValue: CartContextType = useMemo(() => {
    return {
      cart,
      setCart,
      addToCart,
      removeFromCart,
      increase,
      decrease,
      totalAmount,
      totalQuantity,
    };
  }, [cart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

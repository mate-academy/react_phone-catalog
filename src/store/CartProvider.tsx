import React, { useEffect, useState } from 'react';
import { Cart } from '../types/Cart';
import { Product } from '../types/Product';
import { getLocalStorage } from '../utils/utils';

type Props = {
  children: React.ReactNode;
};

export const CartContext = React.createContext<{
  cart: Cart[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}>({
  cart: [],
  addProduct: () => {},
  deleteProduct: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<Cart[]>(getLocalStorage);

  // Save to localstorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function for add product
  const addProduct = (product: Product) => {
    const newProduct = { id: product.id, quantity: 1, product };
    const isHaveProduct = cart.find(item => item.id === newProduct.id);

    if (!isHaveProduct) {
      setCart([...cart, newProduct]);
    }
  };

  const increaseQuantity = (id: number) => {
    const result = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: ++item.quantity };
      }

      return { ...item };
    });

    setCart(result);
  };

  const decreaseQuantity = (id: number) => {
    const result = cart.map(item => {
      if (item.quantity > 1 && item.id === id) {
        return { ...item, quantity: --item.quantity };
      }

      return { ...item };
    });

    setCart(result);
  };

  const deleteProduct = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getStoreValues = () => {
    return {
      cart,
      addProduct,
      deleteProduct,
      increaseQuantity,
      decreaseQuantity,
    };
  };

  return (
    <CartContext.Provider value={getStoreValues()}>
      {children}
    </CartContext.Provider>
  );
};

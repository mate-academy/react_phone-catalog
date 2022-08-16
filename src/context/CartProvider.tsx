import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';

type CartContextType = {
  order: Product[],
  addedToOrder: (item: Product) => void,
  removeItem: (item: Product) => void,
};

export const CartContext = React.createContext({} as CartContextType);

export const CartProvider: React.FC = ({ children }) => {
  const [order, setOrder] = useState<Product[]>([]);

  const getLocalStorage = () => {
    if (localStorage.getItem('cart') !== null) {
      setOrder(JSON.parse(localStorage.getItem('cart') || ''));
    }
  };

  const updateStorage = () => {
    if (order.length) {
      localStorage.setItem('cart', JSON.stringify(order));
    } else {
      localStorage.removeItem('cart');
    }
  };

  const addedToOrder = (item: Product) => {
    setOrder(prevState => ([
      ...prevState,
      item,
    ]));
    item.inOrder = true; // eslint-disable-line no-param-reassign
    item.quantityInOrder = 1; // eslint-disable-line no-param-reassign
  };

  const removeItem = (item: Product) => {
    setOrder(order.filter((product: Product) => product.id !== item.id));
    item.inOrder = false; // eslint-disable-line no-param-reassign
    item.quantityInOrder = 0; // eslint-disable-line no-param-reassign
    localStorage.removeItem(`quantity${item.id}`);
  };

  const contextValue = {
    order,
    addedToOrder,
    removeItem,
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    updateStorage();
  }, [order]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

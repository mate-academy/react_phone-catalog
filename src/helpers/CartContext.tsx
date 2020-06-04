import React, { useState } from 'react';

type CartContextType = {
  itemInCart: Phone[] ;
  addToCart: (item: Phone) => void;
  removeFromCart: (item: Phone) => void;
  isAddedToCart: (item: Phone) => boolean;
  totalCount: number;
  setTotalCount: (number: number) => void;
  totalCost: number;
  setTotalCost: (number: number) => void;
};

export const CartContext = React.createContext<CartContextType>({
  itemInCart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  isAddedToCart: () => false,
  totalCount: 0,
  setTotalCount: () => {},
  totalCost: 0,
  setTotalCost: () => {},
});

export const CartContextWrapper: React.FC = ({ children }) => {
  const [itemInCart, setItemInCart] = useState<Phone[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const addToCart = (item: Phone) => {
    setItemInCart([...itemInCart, item]);
  };

  const removeFromCart = (item: Phone) => {
    setItemInCart(itemInCart.filter(p => p.id !== item.id));
  };

  const isAddedToCart = (item: Phone) => {
    return itemInCart.some(cartItem => cartItem.id === item.id);
  };

  return (
    <CartContext.Provider value={{
      itemInCart,
      addToCart,
      removeFromCart,
      isAddedToCart,
      totalCount,
      setTotalCount,
      totalCost,
      setTotalCost,
    }}
    >
      {children}
    </CartContext.Provider>
  );
};

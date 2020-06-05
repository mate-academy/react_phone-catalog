import React, { useState } from 'react';

type CartContextType = {
  itemInCart: Item[] ;
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
  isAddedToCart: (item: Item) => boolean;
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
  const [itemInCart, setItemInCart] = useState<Item[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const addToCart = (item: Item) => {
    setItemInCart([...itemInCart, item]);
  };

  const removeFromCart = (item: Item) => {
    setItemInCart(itemInCart.filter(p => p.id !== item.id));
  };

  const isAddedToCart = (item: Item) => {
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

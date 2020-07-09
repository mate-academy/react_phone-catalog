import React, { useState } from 'react';

type CartContextType = {
  productInCart: ProductItem[];
  addToCart: (item: ProductItem) => void;
  removeFromCart: (item: ProductItem) => void;
  isAdded: (item: ProductItem) => boolean;
  totalQuantity: number;
  setTotalQuantity: (number: number) => void;
  totalCost: number;
  setTotalCost: (number: number) => void;
};

export const CartContext = React.createContext<CartContextType>({
  productInCart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  isAdded: () => false,
  totalQuantity: 0,
  setTotalQuantity: () => {},
  totalCost: 0,
  setTotalCost: () => {},
});

export const CartContextWrap: React.FC = ({ children }) => {
  const [productInCart, setProductInCart] = useState<ProductItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const addToCart = (item: ProductItem) => {
    setProductInCart([...productInCart, item]);
  };

  const removeFromCart = (item: ProductItem) => {
    setProductInCart(productInCart.filter(product => product.id !== item.id));
  };

  const isAdded = (item: ProductItem) => {
    return productInCart.some(itemCart => itemCart.id === item.id);
  };

  return (
    <CartContext.Provider value={{
      productInCart,
      addToCart,
      removeFromCart,
      isAdded,
      totalQuantity,
      setTotalQuantity,
      totalCost,
      setTotalCost,
    }}
    >
      {children}
    </CartContext.Provider>
  );
};

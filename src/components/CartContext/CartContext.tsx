import React, { useState } from 'react';

type CartContextType = {
  selectedGoods: Good[];
  addSelectedGood: (good: Good) => void;
  removeSelectedGood: (good: Good) => void;
  isSelected: (good: Good) => boolean;
}

export const CartContext = React.createContext<CartContextType> ({
  selectedGoods: [],
  addSelectedGood: () => {},
  removeSelectedGood: () => {},
  isSelected: () => false,
})

export const CartContextWrapper: React.FC = ({ children }) => {
  const [selectedGoods, setCart] = useState<Good[]>([])

  const addSelectedGood = (good: Good) => {
    setCart([...selectedGoods, good ]);
  };

  const removeSelectedGood = (good: Good) => {
    setCart(selectedGoods.filter(selectedGood => selectedGood.id !== good.id));
  };

  const isSelected = (good: Good) => {
    return selectedGoods.some(selectedGood => selectedGood.id === good.id);
  };

  return (
    <CartContext.Provider
      value={{
        selectedGoods,
        addSelectedGood,
        removeSelectedGood,
        isSelected
      }}>
      {children}
    </CartContext.Provider>
  )
}

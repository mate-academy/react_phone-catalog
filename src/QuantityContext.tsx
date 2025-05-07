import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppContext } from './ContextStor';

type QuantityContextType = {
  quantities: number[];
  setQuantities: React.Dispatch<React.SetStateAction<number[]>>;
};

const QuantityContext = createContext<QuantityContextType | undefined>(
  undefined,
);

export const QuantityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { cart } = useAppContext(); // Достаем `cart` из основного контекста
  const [quantities, setQuantities] = useState<number[]>(
    cart.length > 0 ? cart.map(() => 1) : [],
  );

  useEffect(() => {
    // При изменении `cart`, обновляем `quantities` с количеством `1` для новых элементов
    setQuantities(cart.map(() => 1));
  }, [cart]);

  return (
    <QuantityContext.Provider value={{ quantities, setQuantities }}>
      {children}
    </QuantityContext.Provider>
  );
};

export const useQuantityContext = () => {
  const context = useContext(QuantityContext);

  if (!context) {
    throw new Error('useQuantityContext must be used within QuantityProvider');
  }

  return context;
};

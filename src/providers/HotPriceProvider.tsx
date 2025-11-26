import React, { createContext, useContext, useState } from 'react';

type HotPriceContextType = {
  isHotPrice: boolean;
  setIsHotPrice: (value: boolean) => void;
};

const HotPriceContext = createContext<HotPriceContextType | undefined>(
  undefined,
);

export const HotPriceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isHotPrice, setIsHotPrice] = useState(false);

  return (
    <HotPriceContext.Provider value={{ isHotPrice, setIsHotPrice }}>
      {children}
    </HotPriceContext.Provider>
  );
};

export const useHotPrice = () => {
  const context = useContext(HotPriceContext);

  if (!context) {
    throw new Error('useHotPrice must be used within a HotPriceProvider');
  }

  return context;
};

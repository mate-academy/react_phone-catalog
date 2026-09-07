import React from 'react';
import { createContext, useContext } from 'react';

type CarouselContextType = {
  isInProductDetails: boolean;
};

const CarouselContext = createContext<CarouselContextType>({
  isInProductDetails: false,
});

export const useCarouselContext = () => useContext(CarouselContext);

export const CarouselProvider: React.FC<{
  isInProductDetails: boolean;
  children: React.ReactNode;
}> = ({ isInProductDetails, children }) => {
  return (
    <CarouselContext.Provider value={{ isInProductDetails }}>
      {children}
    </CarouselContext.Provider>
  );
};

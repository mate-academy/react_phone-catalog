import React, { createContext } from 'react';

type Props = {
  children: React.ReactNode,
  full: boolean,
};

export const PriceContext = createContext(false);

export const FullPriceProvider:React.FC<Props> = ({ children, full }) => {
  return (
    <PriceContext.Provider value={full}>
      {children}
    </PriceContext.Provider>
  );
};

import React, { useMemo, useState } from 'react';
import { ProductPhone } from '../../Type/phone';

type PropsContext = {
  phones: ProductPhone[],
  setPhones: React.Dispatch<React.SetStateAction<ProductPhone[]>>,
};

export const PhoneContext = React.createContext<PropsContext>({
  phones: [],
  setPhones: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PhoneProvider: React.FC<Props> = ({ children }) => {
  const [phones, setPhones] = useState <ProductPhone[]>([]);

  const value = useMemo(() => ({
    phones, setPhones,
  }), [phones]);

  return (
    <PhoneContext.Provider value={value}>
      {children}
    </PhoneContext.Provider>

  );
};

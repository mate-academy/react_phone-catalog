import React, { useEffect, useState } from 'react';
import { ProductPhone } from '../../Type/phone';
import { getPhones } from '../../utils/fetch';

type PropsContext = {
  phones: ProductPhone[],
  isLoading: boolean,
  isError: boolean,
};

export const PhoneContext = React.createContext<PropsContext>({
  phones: [],
  isLoading: true,
  isError: false,
});

type Props = {
  children: React.ReactNode;
};

export const PhoneProvider: React.FC<Props> = ({ children }) => {
  const [phones, setPhones] = useState <ProductPhone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPhones()
      .then(setPhones)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <PhoneContext.Provider value={{ phones, isLoading, isError }}>
      {children}
    </PhoneContext.Provider>

  );
};

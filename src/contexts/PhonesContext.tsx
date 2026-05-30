import React, { createContext, useContext, useState, useEffect } from 'react';
import { Phone } from '../../src/types/Phone';

type PhonesContextType = {
  phones: Phone[];
  isError: boolean;
  isLoading: boolean;
  reload: () => void;
};

const PhonesContext = createContext<PhonesContextType | undefined>(undefined);

// eslint-disable-next-line max-len
export const PhonesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadPhones = () => {
    setIsLoading(true);
    setIsError(false);

    fetch('./api/phones.json')
      .then(res => res.json())
      .then(res => setPhones(res))
      .catch(() => {
        setIsError(true);
        throw new Error('Something went wrong');
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 500);
      });
  };

  useEffect(() => {
    loadPhones();
  }, []);

  // eslint-disable-next-line max-len
  return (
    // eslint-disable-next-line max-len
    <PhonesContext.Provider value={{ phones, isError, isLoading, reload: loadPhones }}>
      {children}
    </PhonesContext.Provider>
  );
};

export const usePhones = () => {
  const context = useContext(PhonesContext);

  if (!context) {
    throw new Error('usePhones must be used within ProductsProvider');
  }

  return context;
};

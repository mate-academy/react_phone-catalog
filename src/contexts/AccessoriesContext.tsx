import React, { createContext, useContext, useState, useEffect } from 'react';
import { Accessory } from '../../src/types/Accessory';

type AccessoriesContextType = {
  accessories: Accessory[];
  isLoading: boolean;
  isError: boolean;
  reload: () => void;
};

const AccessoriesContext = createContext<AccessoriesContextType | undefined>(undefined);

// eslint-disable-next-line max-len
export const AccessoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadAccessories = () => {
    setIsLoading(true);
    setIsError(false);

    fetch('/api/accessories.json')
      .then(res => res.json())
      .then(res => setAccessories(res))
      .catch(() => {
        setIsError(true);
        throw new Error('Something went wrong');
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 500);
      });
  };

  useEffect(() => {
    loadAccessories();
  }, []);

  // eslint-disable-next-line max-len
  return (
    <AccessoriesContext.Provider
      value={{ accessories, isError, isLoading, reload: loadAccessories }}
    >
      {children}
    </AccessoriesContext.Provider>
  );
};

export const useAccessories = () => {
  const context = useContext(AccessoriesContext);

  if (!context) {
    throw new Error('useAccessories must be used within ProductsProvider');
  }

  return context;
};

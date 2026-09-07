import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tablet } from '../../src/types/Tablet';

type TabletsContextType = {
  tablets: Tablet[];
  isLoading: boolean;
  isError: boolean;
  reload: () => void;
};

const TabletsContext = createContext<TabletsContextType | undefined>(undefined);

// eslint-disable-next-line max-len
export const TabletsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadTablets = () => {
    setIsLoading(true);
    setIsError(false);

    fetch('./api/tablets.json')
      .then(res => res.json())
      .then(res => setTablets(res))
      .catch(() => {
        setIsError(true);
        throw new Error('Something went wrong');
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 500);
      });
  };

  useEffect(() => {
    loadTablets();
  }, []);

  return (
    // eslint-disable-next-line max-len
    <TabletsContext.Provider value={{ tablets, isError, isLoading, reload: loadTablets }}>
      {children}
    </TabletsContext.Provider>
  );
};

export const useTablets = () => {
  const context = useContext(TabletsContext);

  if (!context) {
    throw new Error('useTablets must be used within ProductsProvider');
  }

  return context;
};

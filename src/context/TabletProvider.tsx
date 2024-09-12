import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductChars } from '../types';

const TabletsContext = createContext<ProductChars[]>([]);

export const TabletsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tablets, setTablets] = useState<ProductChars[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('api/tablets.json')
      .then(response => response.json())
      .then(data => {
        setTablets(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load tablets');
        setLoading(false);
      });
  }, []);

  return (
    <TabletsContext.Provider value={tablets}>
      {loading}
      {error && <div>{error}</div>}
      {children}
    </TabletsContext.Provider>
  );
};

export const useTablets = () => useContext(TabletsContext);

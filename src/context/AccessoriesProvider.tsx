import React, { createContext, useContext, useState, useEffect } from 'react';
import { Accessories } from '../types';

const AccessoriesContext = createContext<Accessories[]>([]);

export const AccessoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessories, setAccessories] = useState<Accessories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/accessories.json')
      .then(response => response.json())
      .then(data => {
        setAccessories(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load accessories');
        setLoading(false);
      });
  }, []);

  return (
    <AccessoriesContext.Provider value={accessories}>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {children}
    </AccessoriesContext.Provider>
  );
};

export const useAccessories = () => useContext(AccessoriesContext);

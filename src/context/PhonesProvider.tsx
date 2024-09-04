import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductChars } from '../types';

const PhonesContext = createContext<ProductChars[]>([]);

export const PhonesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [phones, setPhones] = useState<ProductChars[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/phones.json')
      .then(response => response.json())
      .then(data => {
        setPhones(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load phones');
        setLoading(false);
      });
  }, []);

  return (
    <PhonesContext.Provider value={phones}>
      {loading}
      {error && <div>{error}</div>}
      {children}
    </PhonesContext.Provider>
  );
};

export const usePhones = () => useContext(PhonesContext);

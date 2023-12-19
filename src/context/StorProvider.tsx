import React, { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { StorContext } from './StorContext';
import { getProducts } from '../services/getProducts';

type Props = {
  children: React.ReactNode;
};

export const StorProvider: React.FC<Props> = ({ children }) => {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getProducts()
      .then(prod => setProduct(prod))
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = {
    product,
    loading,
    error,
  };

  return (
    <StorContext.Provider
      value={value}
    >
      {children}
    </StorContext.Provider>
  );
};

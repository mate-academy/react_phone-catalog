import React, { useState } from 'react';

import { AllProducts } from '../types/AllProducts/AllProducts';

interface ProductContextType {
  data: AllProducts[];
  loading: boolean;
  error: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<AllProducts[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

type Props = {
  children: React.ReactNode;
};

export const ProductContext = React.createContext<ProductContextType>({
  data: [],
  loading: false,
  error: '',
  setLoading: () => {},
  setData: () => {},
  setError: () => {},
});

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<AllProducts[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const value = {
    data,
    loading,
    error,
    setLoading,
    setData,
    setError,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

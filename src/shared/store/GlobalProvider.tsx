import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { AllProducts } from '../types/AllProducts/AllProducts';

import { getAllProducts } from '../services/apiServices';

interface ProductContextType {
  data: AllProducts[];
  loading: boolean;
  error: string;
}

type Props = {
  children: React.ReactNode;
};

export const ProductContext = React.createContext<ProductContextType>({
  data: [],
  loading: false,
  error: '',
});

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<AllProducts[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getAllProducts('/products.json');

        setData(response.data);
      } catch {
        setError('Something get wrong');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [pathname]);

  const value = {
    data,
    loading,
    error,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

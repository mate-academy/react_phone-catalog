import React, { useEffect, useState } from 'react';

import { AllProducts } from '../types/AllProducts/AllProducts';
import { getAllProducts } from '../services/apiServices';

interface ProductContextType {
  data: AllProducts[];
  isLoading: boolean;
  error: string;
}

type Props = {
  children: React.ReactNode;
};

export const ProductContext = React.createContext<ProductContextType>({
  data: [],
  isLoading: true,
  error: '',
});

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<AllProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        const response = await getAllProducts('/products.json');

        setData(response.data);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    loadAllProducts();
  }, []);

  const value = {
    data,
    isLoading,
    error,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

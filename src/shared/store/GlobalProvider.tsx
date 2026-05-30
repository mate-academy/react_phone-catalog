import { AllProducts } from '../types/AllProduct/AllProduct';
import { getAllProducts } from '../services/apiServices';
import React, { useEffect, useState } from 'react';

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
    const loadProducts = async () => {
      try {
        const response = await getAllProducts('/products.json');

        setData(response.data);
      } catch {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
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

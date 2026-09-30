import { useEffect, useState } from 'react';
import { Product } from '../Types/types';
import { getProducts } from './fetching';

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() =>
        setErrorMessage('Unable to load products'),
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, [trigger]);

  const refetch = () => {
    setTrigger(prev => prev + 1);
  };

  return { products, isLoading, errorMessage, refetch };
};

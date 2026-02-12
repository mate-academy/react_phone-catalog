import { useEffect, useState } from 'react';
import { Product } from '../../../types/Product';
import { getAllProducts } from '../../../api/products';

export const useAllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productList = await getAllProducts();

        setProducts(productList);
      } catch (error) {
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, errorMessage };
};

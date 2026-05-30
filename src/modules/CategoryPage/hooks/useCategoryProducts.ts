/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { useEffect, useState } from 'react';
import { Category, Product } from '../../../types/Product';
import { getProductList } from '../../../api/products';

export const useCategoryProducts = (category: Category) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productList = await getProductList(category);

        setProducts(productList);
      } catch (error) {
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, isLoading, errorMessage };
};

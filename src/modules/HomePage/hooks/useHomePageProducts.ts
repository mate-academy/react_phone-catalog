/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */

import { useEffect, useState } from 'react';
import { Product } from '../../../types/Product';
import { getAllProducts } from '../../../api/products';

export const useHomePageProducts = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const products = await getAllProducts();
        const newProductsData = [...products]
          .sort((a, b) => b.year - a.year)
          .slice(0, 12);
        const hotPricesData = products
          .filter(product => product.fullPrice > product.price)
          .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
          .slice(0, 16);

        setNewProducts(newProductsData);
        setHotPrices(hotPricesData);
      } catch (error) {
        console.error(error);
        setErrorMessage('Unable to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { newProducts, hotPrices, loading, errorMessage };
};

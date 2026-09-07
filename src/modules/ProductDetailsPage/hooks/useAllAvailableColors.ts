/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { useEffect, useState, useMemo } from 'react';
import { getProductsByCategoty } from '../../../api/products';
import { ProductDetails } from '../../../types/Product';

export const useAllAvailableColors = () => {
  const [products, setProducts] = useState<ProductDetails[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [phones, tablets, accessories] = await Promise.all([
          getProductsByCategoty('phones'),
          getProductsByCategoty('tablets'),
          getProductsByCategoty('accessories'),
        ]);

        setProducts([...phones, ...tablets, ...accessories]);
      } catch (error) {
        console.error('Something went wrong');
      }
    };

    fetchProducts();
  }, []);

  const allUniqueColors = useMemo(() => {
    const all = products.flatMap(p => p.colorsAvailable);

    return Array.from(new Set(all));
  }, [products]);

  return { allUniqueColors };
};

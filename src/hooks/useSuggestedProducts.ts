import { useEffect, useState } from 'react';
import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { getSuggestedProducts } from '../utils/client';

// excludedKey: item ids joined with "|", a string keeps the effect stable,
// so the suggestions are not reshuffled when only a color/capacity changes
export const useSuggestedProducts = (category?: Category, excludedKey = '') => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!category) {
      return undefined;
    }

    let isCancelled = false;

    getSuggestedProducts(category, excludedKey.split('|'))
      .then(result => {
        if (!isCancelled) {
          setProducts(result);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setProducts([]);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [category, excludedKey]);

  return products;
};

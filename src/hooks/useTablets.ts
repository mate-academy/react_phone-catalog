import { useEffect, useState } from 'react';

import { getProducts } from '../services/products';
import { Categories } from '../types/Categories';
import { Product } from '../types/Product';

export const useTablets = () => {
  const [tablets, setTablets] = useState<Product[]>([]);

  const fetchTablets = () => {
    return getProducts(Categories.tablets);
  };

  useEffect(() => {
    fetchTablets().then(products => {
      setTablets(products);
    });
  }, []);

  return { tablets };
};

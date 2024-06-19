import { useEffect, useState } from 'react';

import { getProducts } from '../services/products';
import { Categories } from '../types/Categories';
import { Product } from '../types/Product';

export const useAccessories = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);

  const fetchAccessories = () => {
    return getProducts(Categories.accessories);
  };

  useEffect(() => {
    fetchAccessories().then(products => {
      setAccessories(products);
    });
  }, []);

  return { accessories };
};

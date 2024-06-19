import { useEffect, useState } from 'react';

import { getProducts } from '../services/products';
import { Categories } from '../types/Categories';
import { Product } from '../types/Product';

export const usePhones = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  const fetchPhones = () => {
    return getProducts(Categories.phones);
  };

  useEffect(() => {
    fetchPhones().then(products => {
      setPhones(products);
    });
  }, []);

  return { phones };
};

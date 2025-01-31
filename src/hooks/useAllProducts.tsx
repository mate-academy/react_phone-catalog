import { useEffect, useState } from 'react';
import { AllProduct } from '../types/AllProduct';

export const useAllProducts = () => {
  const [allProducts, setAllProducts] = useState<AllProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const categories = ['phones', 'tablets', 'accessories'];
      const promises = categories.map(category =>
        fetch(`/api/${category}.json`).then(res => res.json()),
      );

      const data = await Promise.all(promises);
      setAllProducts(data.flat());
    };

    fetchProducts();
  }, []);

  return { allProducts };
};

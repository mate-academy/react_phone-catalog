import { useEffect, useState } from 'react';
import { AllProduct } from '../types/AllProduct';

export const useAllProducts = (errorCallback: () => void) => {
  const [allProducts, setAllProducts] = useState<AllProduct[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = ['phones', 'tablets', 'accessories'];
        const promises = categories.map(async category => {
          const response = await fetch(
            `https://irynamariiko00.github.io/react_phone-catalog/api/${category}.json`,
          );
          return response.json();
        });

        const data = await Promise.all(promises);

        await new Promise(resolve => setTimeout(resolve, 300));

        setAllProducts(data.flat());
      } catch {
        errorCallback();
      }
    };

    fetchProducts();
  }, []);

  return { allProducts };
};

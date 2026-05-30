import { useEffect, useState } from 'react';
import { CategoryTypes, Products } from '../types/Types';
import { getData } from '../api/data';

export const useCategoruCount = () => {
  const [count, setCount] = useState({
    [CategoryTypes.PHONES]: 0,
    [CategoryTypes.TABLETS]: 0,
    [CategoryTypes.ACCESSORIES]: 0,
  });

  useEffect(() => {
    const updateCount = {
      [CategoryTypes.PHONES]: 0,
      [CategoryTypes.TABLETS]: 0,
      [CategoryTypes.ACCESSORIES]: 0,
    };
    const fetchProducts = async () => {
      try {
        const products = await getData<Products>('/products.json');

        products.forEach(product => {
          switch (product.category) {
            case CategoryTypes.PHONES:
              updateCount[CategoryTypes.PHONES]++;
              break;
            case CategoryTypes.TABLETS:
              updateCount[CategoryTypes.TABLETS]++;
              break;
            default:
              updateCount[CategoryTypes.ACCESSORIES]++;
          }
        });

        setCount(updateCount);
      } catch (error) {
        throw new Error('Error fetching products for categories');
      }
    };

    fetchProducts();
  }, []);

  return count;
};

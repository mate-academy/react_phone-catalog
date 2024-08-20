import { useMemo } from 'react';
import { useAppSelector } from './hooks';
import { Products } from '../../../types/Product';

const useSuggestedProducts = () => {
  const { products } = useAppSelector(state => state.product);

  const getSuggestedProducts = useMemo(() => {
    const product: Products[] = [];

    for (let i = 0; i < products.length; i++) {
      const randomIndex = Math.floor(Math.random() * products.length);

      if (!product.includes(products[randomIndex])) {
        product.push(products[randomIndex]);
      }

      if (product.length >= 20) {
        break;
      }
    }

    return product;
  }, [products]);

  return { getSuggestedProducts };
};

export default useSuggestedProducts;

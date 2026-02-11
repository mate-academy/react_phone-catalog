import { useEffect, useMemo, useState } from 'react';
import { Carousel } from '../../../shared/Carousel';
import type { Product } from '../../../../types/types';

export const HotPrices = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Уesponse not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const sortedProducts = useMemo(() => {
    return products
      .sort((a, b) => {
        return b.fullPrice - b.price - (a.fullPrice - a.price);
      })
      .slice(0, 20);
  }, [products]);

  return <Carousel pageTitle={'Hot prices'} products={sortedProducts} />;
};

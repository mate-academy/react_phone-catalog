import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../../../../types/types';
import { Carousel } from '../../../shared/Carousel';

export const NewModels = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const ShowDiscount = false;

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
        return b.year - a.year;
      })
      .slice(0, 20);
  }, [products]);

  return <Carousel pageTitle={'Brand new models'} products={sortedProducts} ShowDiscount={ShowDiscount} />;
};

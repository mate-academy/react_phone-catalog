import { useEffect, useState } from 'react';
import { getProducts } from '../../api/api';
import { Product } from '../../types/ProductTypes';
import { ProductsSlider } from '../ProductSlider/ProductSlider';

export const HotPricesProducts = () => {
  const [cheapestProducts, setCheapestProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    getProducts().then(products => {
      const sorted = [...products].sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
      const cheapest = sorted.slice(0, 13);
      setCheapestProducts(cheapest);
      setName('Hot prices');
    });
  }, []);

  return <ProductsSlider products={cheapestProducts} name={name} />;
};

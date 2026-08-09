/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';

import { getProducts } from '../../../../api/products';
import { ProductsSlider } from '../../../../components/ProductsSlider';
import { Product } from '../../../../types/Product';

export const HotPrices = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(data => {
      const sortedProducts = [...data].sort((a, b) => {
        const discountA = a.fullPrice - a.price;
        const discountB = b.fullPrice - b.price;

        return discountB - discountA;
      });

      setProducts(sortedProducts);
    });
  }, []);

  return (
    <ProductsSlider
      title="Hot prices"
      products={products}
    />
  );
};

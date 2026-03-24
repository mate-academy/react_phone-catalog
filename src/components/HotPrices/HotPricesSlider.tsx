import 'swiper/css';
import 'swiper/css/navigation';
import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/client';

import { ProductSlider } from '../ProductSlider';
type Props = {
  title: string;
  showDiscount: boolean;
};
export const HotPricesSlider: React.FC<Props> = ({ title, showDiscount }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(data => {
      const topDiscount = data
        .sort((a, b) => {
          const discountA = a.fullPrice - a.price;
          const discountB = b.fullPrice - b.price;

          return discountB - discountA;
        })
        .slice(0, 20);

      setProducts(topDiscount);
    });
  }, []);

  return (
    <>
      <ProductSlider
        products={products}
        title={title}
        showDiscount={showDiscount}
      />
    </>
  );
};

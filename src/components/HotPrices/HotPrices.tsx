import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/api';

import 'swiper/css';
import 'swiper/css/navigation';
// eslint-disable-next-line max-len
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const HotPrices = () => {
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

  return <ProductsSlider title="Hot prices" products={products} />;
};

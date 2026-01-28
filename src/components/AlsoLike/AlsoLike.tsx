import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/api';

import 'swiper/css';
import 'swiper/css/navigation';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const AlsoLike = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(data => {
      const shuffled = [...data];

      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      const randomProducts = shuffled.slice(0, 10);

      setProducts(randomProducts);
    });
  }, []);

  return <ProductsSlider title="You may also like" products={products} />;
};

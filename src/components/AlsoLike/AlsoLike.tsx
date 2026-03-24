import { useEffect, useState } from 'react';
import { ProductSlider } from '../ProductSlider';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/client';

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

  return (
    <ProductSlider
      products={products}
      title="You may also like"
      showDiscount={true}
    />
  );
};

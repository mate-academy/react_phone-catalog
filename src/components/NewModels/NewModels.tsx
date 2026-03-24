import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';

import 'swiper/css';
import 'swiper/css/navigation';
import { ProductSlider } from '../ProductSlider';
import { getProducts } from '../../api/client';

export const NewModels = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(data => {
      const top20 = data
        .sort((a, b) => b.year - a.year)
        .slice(0, 20)
        .sort((a, b) => b.price - a.price);

      setProducts(top20);
    });
  }, []);

  return (
    <ProductSlider
      title="Brand new models"
      showDiscount={false}
      products={products}
    />
  );
};

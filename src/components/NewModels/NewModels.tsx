import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/api';

import 'swiper/css';
import 'swiper/css/navigation';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

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
    <ProductsSlider
      title="Brand new models"
      products={products}
      showDiscount={false}
    />
  );
};

import React, { useEffect, useState } from 'react';
import { ProductType } from '../../types/ProductType';
import { getProducts } from '../../api/serviceApi';
import { ProductSlider } from '../ProductSlider/ProductSlider';

export const HotPrice: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getProducts().then(product =>
      setProducts(
        product.sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price)),
      ),
    );
  }, []);

  return (
    <section>
      <ProductSlider products={products} title="Hot prices" />
    </section>
  );
};

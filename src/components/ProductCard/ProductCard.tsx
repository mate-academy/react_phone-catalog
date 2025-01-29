import React, { useEffect, useState } from 'react';
import { ProductType } from '../../types/ProductType';
import { getProducts } from '../../api/serviceApi';
import { ProductSlider } from '../ProductSlider/ProductSlider';

export const ProductCard: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getProducts().then(product =>
      setProducts(product.sort((a, b) => b.year - a.year)),
    );
  }, []);

  return (
    <section>
      <ProductSlider products={products} title="Brand new models" />
    </section>
  );
};

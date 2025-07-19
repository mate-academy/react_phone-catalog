import { useEffect, useState } from 'react';

import { Product } from '../../../../types/Product';
import { ProductsSlider } from '../../../../components/ProductsSlider';

export const HotPrices = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {});
  }, []);

  const hotProducts = products
    .filter(
      product =>
        product.fullPrice !== undefined &&
        product.price !== undefined &&
        product.fullPrice > product.price,
    )
    .sort((a, b) => {
      const discountA = a.fullPrice! - a.price!;
      const discountB = b.fullPrice! - b.price!;

      return discountB - discountA;
    })
    .slice(0, 8);

  return (
    <ProductsSlider
      title="Hot prices"
      products={hotProducts}
      showFullPrice={true}
    />
  );
};

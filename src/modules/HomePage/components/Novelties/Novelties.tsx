import { useEffect, useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductsSlider } from '../../../../components/ProductsSlider';

export const Novelties = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {});
  }, []);

  const newestProducts = [...products]
    .filter(product => product.year !== undefined)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, 8);

  return (
    <ProductsSlider
      title="Brand new models"
      products={newestProducts}
      showFullPrice={false}
    />
  );
};

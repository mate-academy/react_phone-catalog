import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getSuggestedProducts } from '../../api/products';
import { ProductsSlider } from '../ProductsSlider';

export const SuggestedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSuggestedProducts()
      .then(data => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading || products.length === 0) {
    return null;
  }

  return <ProductsSlider title="You may also like" products={products} />;
};

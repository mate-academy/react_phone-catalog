/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

import { getProducts } from '../../../../api/products';
import { ProductsSlider } from '../../../../components/ProductsSlider';
import { Product } from '../../../../types/Product';

export const BrandNewModels = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(data => {
      const sortedProducts = [...data].sort((a, b) => b.year - a.year);

      setProducts(sortedProducts);
    });
  }, []);

  return (
    <ProductsSlider
      title="Brand new models"
      products={products}
    />
  );
};

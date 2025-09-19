import { useEffect, useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const BrandNew = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(setAllProducts);
  }, []);

  const brandNew = [...allProducts].sort((a, b) => b.year - a.year);

  return <ProductsSlider title={'Brand new'} products={brandNew} />;
};

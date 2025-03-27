import { useEffect, useState } from 'react';
import { ProductSlider } from '@components/ProductSlider';
import { getProducts } from '@api/productsApi';
import { ProductType } from 'types/productTypes';

export const BrandNew = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getProducts().then(product =>
      setProducts(product.sort((a, b) => b.year - a.year)),
    );
  }, []);

  return (
    <section className="section">
      <ProductSlider data={products} title={'Brand new models'} hideOldPrice />
    </section>
  );
};

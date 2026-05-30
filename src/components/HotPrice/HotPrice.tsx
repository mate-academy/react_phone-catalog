import { useEffect, useState } from 'react';
import { ProductType } from 'types/productTypes';
import { getProducts } from '@api/productsApi';
import { ProductSlider } from '@components/ProductSlider';

export const HotPrice = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getProducts().then(product =>
      setProducts(
        product.sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price)),
      ),
    );
  }, []);

  return (
    <section className="w-full">
      <ProductSlider data={products} title={'Hot Prices'} />
    </section>
  );
};

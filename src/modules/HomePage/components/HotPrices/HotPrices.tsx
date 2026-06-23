import { useEffect, useState } from 'react';

import styles from './HotPrices.module.scss';
import { Product } from '../../../../shared/types/Product';
import { getProducts } from '../../../../api/products';
import { ProductSlider } from '../../../../shared/components/ProductSlider';
const title = 'Hot prices';

export const HotPrices = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const isShowDiscount = true;

  useEffect(() => {
    getProducts().then((data: Product[]) => {
      const hotProducts = data
        .filter(p => p.price < p.fullPrice)
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

      setProducts(hotProducts);
    });
  }, []);

  return (
    <div className={styles['hot-prices']}>
      <ProductSlider
        title={title}
        products={products}
        isShowDiscount={isShowDiscount}
      />
    </div>
  );
};

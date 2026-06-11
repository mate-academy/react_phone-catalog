import { useEffect, useState } from 'react';
import { Product, ProductSlider } from '../ProductSlider/ProductSlider';
import { getProducts } from '../../api/products';
import styles from './HotPrices.module.scss';
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

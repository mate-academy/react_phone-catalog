import { useMemo, useState } from 'react';
import { useProducts } from '../../store/ProductsContext';
import { ProductsSlider } from '../ProductsSlider';
import { SliderButtons } from '../SliderButtons';
import styles from './HotPrices.module.scss';

export const HotPrices = () => {
  const { products } = useProducts();
  const [index, setIndex] = useState(0);

  const sortedProducts = useMemo(() => {
    const updatedProducts = [...products];

    updatedProducts.sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );

    return updatedProducts;
  }, [products]);

  return (
    <div className={styles['hot-prices']}>
      <div className={styles['hot-prices__top']}>
        <h2 className={styles['hot-prices__title']}>Hot prices</h2>
        <SliderButtons
          products={sortedProducts}
          index={index}
          onIndex={setIndex}
        />
      </div>
      <ProductsSlider hot={true} products={sortedProducts} index={index} />
    </div>
  );
};

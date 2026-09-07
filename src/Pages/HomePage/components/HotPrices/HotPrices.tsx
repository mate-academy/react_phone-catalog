import { useState } from 'react';
import styles from './HotPrices.module.scss';
import products from '../../../../../public/api/products.json';
import { ProductsSlider } from '../ProductSlider';
import { ProductSliderButtons } from '../ProductSliderButtons';

export const HotPrices = () => {
  const [index, setIndex] = useState(0);

  const sortedProducts = [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );

  const uniqueProducts = [];

  for (let i = 0; i < sortedProducts.length - 1; i++) {
    if (
      i > 0 &&
      sortedProducts[i - 1].capacity === sortedProducts[i].capacity
    ) {
      continue;
    } else {
      uniqueProducts.push(sortedProducts[i]);
    }
  }

  return (
    <section className={styles.hotprices}>
      <div className={styles.hotprices__top}>
        <h2>Hot prices</h2>
        <ProductSliderButtons
          length={uniqueProducts.length}
          index={index}
          setIndex={setIndex}
        />
      </div>
      <ProductsSlider
        uniqueProducts={uniqueProducts}
        index={index}
        fullPrice={true}
      />
    </section>
  );
};

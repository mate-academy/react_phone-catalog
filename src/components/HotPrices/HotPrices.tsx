import { useRef } from 'react';
import styles from './HotPrices.module.scss';
import { hotPricesData } from '../../data/hotPricesData';
import { ProductCard } from '../ProductCard/ProductCard';

export const HotPrices = () => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <section className={styles.hotPrices}>
      <div className={styles.hotPricesHeader}>
        <h1 className={styles.hotPricesTitle}>Hot Prices</h1>

        <div className={styles.hotPricesButtons}>
          <button
            className={styles.hotPricesArrow + ' ' + styles.hotPricesArrowLeft}
            onClick={scrollLeft}
          >
            <img src="src/Icons/rigthArrowBlack.svg" alt="Scroll left" />
          </button>
          <button
            className={styles.hotPricesArrow + ' ' + styles.hotPricesArrowRight}
            onClick={scrollRight}
          >
            <img src="src/Icons/lefthArrowBlack.svg" alt="Scroll right" />
          </button>
        </div>
      </div>

      <div className={styles.hotPricesCarousel} ref={carouselRef}>
        {hotPricesData.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

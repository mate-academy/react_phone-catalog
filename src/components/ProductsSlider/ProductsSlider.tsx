import { useRef, useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
  hideOldPrice?: boolean;
}

export const ProductsSlider = ({ title, products, hideOldPrice }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);

    return () => window.removeEventListener('resize', checkScroll);
  }, [products]);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -288 * 2, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 288 * 2, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.slider}>
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{title}</h2>
        <div className={styles.slider__buttons}>
          <button
            className={styles.slider__btn}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <img src="/img/arrow-left.png" alt="Left" />
          </button>
          <button
            className={styles.slider__btn}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <img src="/img/arrow-right.png" alt="Right" />
          </button>
        </div>
      </div>

      <div className={styles.slider__track_container}>
        <div
          className={styles.slider__track}
          ref={trackRef}
          onScroll={checkScroll}
        >
          {products.map(product => (
            <div key={product.id} className={styles.slider__item}>
              <ProductCard product={product} hideOldPrice={hideOldPrice} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

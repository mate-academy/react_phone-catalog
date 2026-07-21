import { useRef, useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider = ({ title, products }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    setCanScrollLeft(track.scrollLeft > 0);
    setCanScrollRight(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 1,
    );
  };

  useEffect(() => {
    updateScrollState();
  }, [products]);

  const scrollLeft = () => {
    trackRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    trackRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div className={styles.slider}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.count}>{products.length} models</span>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.btnLeft}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <img src="/img/button-right-default.png" alt="Previous" />
          </button>
          <button
            className={styles.btnRight}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <img src="/img/button-right-default.png" alt="Next" />
          </button>
        </div>
      </div>
      <div className={styles.trackContainer}>
        <div
          className={styles.track}
          ref={trackRef}
          onScroll={updateScrollState}
        >
          {products.map(product => (
            <div key={product.itemId} className={styles.item}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

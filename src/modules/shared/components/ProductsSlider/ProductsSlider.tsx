import { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { getPublicPath } from '../../utils/getPublicPath';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    const el = scrollRef.current;

    if (!el) {
      return;
    }

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  const scrollByCards = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -288 : 288,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    checkScrollPosition();
  }, [products]);

  return (
    <div className={styles.productsSlider}>
      <div className={styles.productsSliderTop}>
        <h2 className={styles.productsSliderTitle}>{title}</h2>
        <div className={styles.productsSliderButtons}>
          <button
            className={styles.productsSliderButton}
            onClick={() => scrollByCards('left')}
            disabled={!canScrollLeft}
          >
            <img
              className={styles.productsSliderButtonImg}
              src={
                canScrollLeft
                  ? getPublicPath('/img/active-arrow.svg')
                  : getPublicPath('img/comon-arrow.svg')
              }
              alt="arrow"
            />
          </button>
          <button
            className={`${styles.productsSliderButton} ${styles.productsSliderButtonRight} ${styles.productsSliderButtonActive}`}
            onClick={() => scrollByCards('right')}
            disabled={!canScrollRight}
          >
            <img
              className={styles.productsSliderButtonImg}
              src={
                canScrollRight
                  ? getPublicPath('/img/active-arrow.svg')
                  : getPublicPath('/img/comon-arrow.svg')
              }
              alt="arrow"
            />
          </button>
        </div>
      </div>

      <div
        className={styles.productsSliderTrack}
        ref={scrollRef}
        onScroll={checkScrollPosition}
      >
        {products.map(p => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
};

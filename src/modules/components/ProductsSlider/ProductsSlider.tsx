import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard';
import { useEffect, useRef, useState } from 'react';
import { withBase } from '../../../utils/withBase';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
};

const SCROLL_STEP = 232;

export const ProductsSlider = ({ title, products }: Props) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
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
    updateArrows();
  }, [products]);

  const scrollBy = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: SCROLL_STEP * 4 * direction,
      behavior: 'smooth',
    });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Scroll left"
            onClick={() => scrollBy(-1)}
            disabled={!canScrollLeft}
          >
            <img src={withBase('/img/icons/Arrow Left.svg')} alt="" />
          </button>

          <button
            type="button"
            className={styles.arrow}
            aria-label="Scroll right"
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
          >
            <img src={withBase('/img/icons/Arrow Right.svg')} alt="" />
          </button>
        </div>
      </div>

      <ul className={styles.track} ref={trackRef} onScroll={updateArrows}>
        {products.map(product => (
          <li key={product.id} className={styles.item}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};

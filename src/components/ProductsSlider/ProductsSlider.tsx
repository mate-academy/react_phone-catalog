import { useRef } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

const GAP = 16;

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider = ({ title, products }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const track = sliderRef.current;

    if (track) {
      const itemWidth = track.children[0]?.clientWidth || 0;

      track.scrollBy({ left: direction * (itemWidth + GAP) });
    }
  };

  if (!products.length) {
    return null;
  }

  return (
    <div className={styles.slider} data-cy="ProductsSlider">
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{title}</h2>
        <div className={styles.slider__actions}>
          <button
            className={styles.slider__btn}
            onClick={() => scroll(-1)}
            aria-label="Previous"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className={styles.slider__btn}
            onClick={() => scroll(1)}
            aria-label="Next"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className={styles.slider__track} ref={sliderRef}>
        {products.map(product => (
          <div key={product.id} className={styles.slider__item}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

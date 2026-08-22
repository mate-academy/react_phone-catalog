import { useRef } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard';
import { Icon } from '../Icon';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
};

const CARD_WIDTH = 272;

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: direction * CARD_WIDTH * 2,
      behavior: 'smooth',
    });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.slider}>
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{title}</h2>

        <div className={styles.slider__controls}>
          <button
            type="button"
            aria-label="Scroll left"
            className={styles.slider__button}
            onClick={() => scrollBy(-1)}
          >
            <Icon name="chevron-left" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            className={styles.slider__button}
            onClick={() => scrollBy(1)}
          >
            <Icon name="chevron-right" />
          </button>
        </div>
      </div>

      <ul className={styles.slider__track} ref={trackRef}>
        {products.map(product => (
          <li key={product.id} className={styles.slider__item}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};

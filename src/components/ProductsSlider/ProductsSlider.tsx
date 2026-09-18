import { useRef } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider = ({ title, products }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.children[0]?.clientWidth || 0;

      sliderRef.current.scrollBy({
        left: -(itemWidth + 16),
        behavior: 'smooth',
      }); // 16px - gap
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.children[0]?.clientWidth || 0;

      sliderRef.current.scrollBy({ left: itemWidth + 16, behavior: 'smooth' });
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
          <button className={styles.slider__btn} onClick={scrollLeft}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className={styles.slider__btn} onClick={scrollRight}>
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

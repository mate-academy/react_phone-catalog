import { useRef } from 'react';
import styles from './ProductsSlider.module.scss';
import { NormalizedProduct, Product } from '../../../../interfaces/Product';
import { ProductCard } from '../../../shared/ProductCard';

type Props = {
  title: string;
  products: NormalizedProduct[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    containerRef.current?.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  const scrollLeft = () => {
    containerRef.current?.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slider__top}>
        <h2 className="section-title">{title}</h2>
        <div className={styles.slider__btns}>
          <button
            className={`${styles.slider__btn} ${styles.slider__btn_left}`}
            onClick={scrollLeft}
          ></button>
          <button
            className={`${styles.slider__btn} ${styles.slider__btn_right}`}
            onClick={scrollRight}
          ></button>
        </div>
      </div>
      <div ref={containerRef} className={styles.cards}>
        {products.map(product => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

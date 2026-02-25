import styles from './ProductSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { BaseProduct } from '../../types';
import { useState } from 'react';

interface Props {
  title: string;
  products: BaseProduct[];
  variant?: string;
}

export const ProductSlider = ({ variant = '', title, products }: Props) => {
  const SLIDES = [...products].slice(0, 15);

  const [position, setPosition] = useState(0);
  const gapCss = 16;
  const itemWidth = 272 + gapCss;
  const frameSize = 4;
  const step = 1;
  const animationDuration = 1000;

  const carouselListWidth = SLIDES.length * itemWidth;
  const maxShift = Math.max(0, SLIDES.length - frameSize); // how many items can be shifted
  const maxPos = Math.max(0, Math.ceil(maxShift / step));

  const moveX = -position * step * itemWidth; // negative to move content left

  const handlePrev = () => {
    setPosition(prev => Math.min(maxPos, prev - 1));
  };

  const handleNext = () => {
    setPosition(prev => Math.min(maxPos, prev + 1));
  };

  return (
    <section className={`${styles.slider}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Scroll left"
            onClick={handlePrev}
            disabled={position <= 0}
          >
            <i className="fas fa-chevron-left" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Scroll right"
            onClick={handleNext}
            disabled={position >= maxPos}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>

      <div
        className={styles.list}
        style={{
          width: carouselListWidth,
          transform: `translateX(${moveX}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {SLIDES.map((product: BaseProduct) => (
          <div key={product.id} className={styles.item}>
            <ProductCard variant={variant} product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
